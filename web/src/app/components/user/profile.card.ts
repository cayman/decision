import {Component, OnInit, OnDestroy} from '@angular/core';
import {UrlService,LogService} from "../../shared";

import {Subscription} from "rxjs";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import {UserRestService} from './user.rest';
import {UserDTO} from './user.dto';
import {AuthSessionService} from "../auth";

@Component({
    selector: 'profile-card',
    templateUrl: 'profile.card.html'
})
export class ProfileCard implements OnInit, OnDestroy {

    user:UserDTO;

    private subscription: Subscription;

    error:any;

    constructor(private userRest: UserRestService,
                private session: AuthSessionService,  private log: LogService,
                public url: UrlService){
        this.log.debug(this);

        this.subscription = session.user
            .filter(user=>!!user)
            .map((user:UserDTO)=>user.login)
            .switchMap(login => this.userRest.getItem(login))
            .do((user)=>this.log.info(this,'user',user))
            .subscribe((user:UserDTO)=>{this.user = user },
                e=>this.log.error(this,'subscribe',this.error = e));

    }


    ngOnInit() {
        this.log.trace(this,'ngOnInit');

    }
    ngOnDestroy() {
        this.log.debug(this,'ngOnDestroy');
        this.subscription.unsubscribe();
    }
}
