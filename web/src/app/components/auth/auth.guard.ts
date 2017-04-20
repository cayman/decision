/**
 * Created by rustem on 13.04.17.
 */
import { Injectable }       from '@angular/core';
import {
    CanActivate, CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';

import {UrlService,LogService} from '../../shared';

import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AuthSessionService }      from './auth.session';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


    constructor(private session: AuthSessionService, private log: LogService,
                public url: UrlService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkLogin(state.url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): Observable<boolean>{
        this.log.debug(this,'checkLogin',url);
        return this.session.isAuthenticated
            .do(allow=>this.log.log(this,allow?'allow':'deny',url))
            .do(allow=>!allow && url!=this.url.LOGIN? this.session.setRedirectUrl(url) : null)
            .do((allow)=>!allow? this.url.navigate([this.url.LOGIN]):null)
            .do(allow=>!allow? this.log.log(this,'redirect',this.url.LOGIN):null)
    }
}
