import {Component, OnInit, OnDestroy} from '@angular/core';
import {UrlService,LogService} from '../../shared';

import {AuthSessionService} from "./auth.session";

import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'auth-bar',
    styleUrls: ['./auth.bar.css'],
    templateUrl: 'auth.bar.html'
})
export class AuthBar implements OnInit, OnDestroy {

    name: string;
    authenticated: boolean;

    private subscription: Subscription;

    constructor(private session: AuthSessionService, private log: LogService,
                public url:UrlService){
        this.subscription = this.session.user
            .do((user)=>log.log(this,'current admin',user))
            .do((user)=>this.name = user?user.name:'Guest')
            .map((user)=>!!user)
            .subscribe((authenticated :boolean)=>{
                this.authenticated =authenticated
            });

    }


    public logout(){
        this.session.logout()
            .subscribe((status:string)=>{
                this.log.debug(this,'redirect',this.url.LOGIN);
                this.url.navigate([this.url.LOGIN]);
            });
    }

    ngOnInit() {
        this.log.trace(this,'ngOnInit');

    }
    ngOnDestroy() {
        this.log.debug(this,'ngOnDestroy');
        this.subscription.unsubscribe();
    }

}
