import {Injectable, OnDestroy} from '@angular/core';
import {UrlService,FormValidators,LogService} from "../../shared";

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from "rxjs/Subscription";
import {ReplaySubject} from "rxjs/ReplaySubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import {UserDTO} from '../user';
import {AuthRestService} from './auth.rest';


@Injectable()
export class AuthSessionService implements OnDestroy{

    private subject: Subject<UserDTO>;

    private subscription: Subscription;

    private authenticated = false;
    private grants:string[]=[];

    private redirectUrl: string;

    constructor(private rest: AuthRestService,private log: LogService,
                public url: UrlService){
        this.subject = new ReplaySubject<UserDTO>();
    }

    private ping = () => this.rest.user()
        .subscribe((user:UserDTO)=>{
            this.onLogin(user);
        },error=>{
            this.log.error(this,'ping', error);
            this.onLogout();
            // if(error.httpStatusCode === 401) {
            //     this.url.navigate([this.url.LOGIN]);
            //     log.error(this,'redirect to login page', error);
            // }

        });

    get user(): Observable<UserDTO> {
        this.subscription = this.subscription || this.ping();
        return this.subject.asObservable();
    }

    get isAuthenticated(): Observable<boolean> {
        return this.subscription ?
            Observable.of(this.authenticated):
            this.user.first().map(user=>!!user)
    }

    public allow(grant:any){
        return this.grants.filter(userGrant=>userGrant === grant || userGrant === grant.write || userGrant === grant.read).length>0;
    }

    public getRedirectUrl(){
         return this.redirectUrl || this.url.HOME;
    }

    public setRedirectUrl(url:string){
        this.log.log(this,'redirectUrl',url);
        this.redirectUrl = url;
    }

    private onLogin(user){
        this.grants = user.roles.reduce((grants,role)=>grants.concat(role.grants),[]);
        this.authenticated = true;
        this.log.debug(this,'authenticated',this.grants);
        this.subject.next(user);
        return user;
    }

    private onLogout(){
        this.grants = [];
        this.authenticated = false;
        this.log.debug(this,'not authenticated');
        this.subject.next(null);
    }

    login(credentials:UserDTO) : Observable<UserDTO> {
        this.log.debug(this,'login');
        return this.rest.login(credentials)
            .map((user:UserDTO)=>this.onLogin(user));

    }

    logout() : Observable<string> {
        this.log.debug(this,'logout');
        return this.rest.logout()
            .map((status:string)=>{
                this.onLogout();
                return status;
            });

    }

    ngOnDestroy() {
        this.log.debug(this,'ngOnDestroy');
        this.subscription.unsubscribe()
    }

}