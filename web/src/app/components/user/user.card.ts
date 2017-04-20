import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UrlService,LogService} from "../../shared";

import {Subscription} from "rxjs";
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


import {UserRestService} from './user.rest';
import {UserDTO} from './user.dto';
import {RoleDTO,RoleRestService} from "../role/";
import {AuthSessionService} from "../auth/auth.session";

@Component({
    selector: 'user-card',
    templateUrl: 'user.card.html'
})
export class UserCard implements OnInit, OnDestroy {


    current: boolean = true;
    user:UserDTO;

    private subscription: Subscription;

    error:any;

    constructor(private userRest: UserRestService, private roleRest: RoleRestService,
                private session: AuthSessionService,  private log: LogService,
                public url: UrlService, private route: ActivatedRoute){
        this.log.debug(this);

        this.subscription = this.url.getParamId(route)
            .switchMap(id => this.userRest.getItem(id))
            .flatMap((user:UserDTO)=> session.user
                .do((admin:UserDTO)=>user.current = admin && user.login === admin.login)
                .map(()=>user)
            )
            .do((user)=>this.log.info(this,'user',user))
            .subscribe((user:UserDTO)=>{this.user = user },
                e=>this.log.error(this,'subscribe',this.error = e));

    }


    inRoles(role,roles:RoleDTO[]){
        return roles.find(item=>item.id===role.id)!=null;
    }

    remove(){
        this.userRest.removeItem(this.user.id)
            .subscribe((status:string)=>{
                this.url.navigate([this.url.USERS]);
            },e=>this.log.error(this,'remove',this.error = e));
    }

    ngOnInit() {
        this.log.trace(this,'ngOnInit');

    }
    ngOnDestroy() {
        this.log.debug(this,'ngOnDestroy');
        this.subscription.unsubscribe();
    }
}
