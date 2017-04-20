import {Component, OnInit, OnDestroy} from '@angular/core';
import {UrlService,LogService,ListDTO} from "../../shared";

import {RoleRestService} from './role.rest';
import {RoleDTO} from './role.dto';

import {Subscription} from "rxjs";

@Component({
    selector: 'role-list',
    templateUrl: 'role.list.html'
})
export class RoleList implements OnInit, OnDestroy {

    roles: RoleDTO[];
    private subscription: Subscription;

    public error:any;

    constructor(private roleRest: RoleRestService, private log: LogService,
                public url: UrlService){
        this.log.debug(this);
        this.subscription = this.roleRest.getSortedArray()
            .do(roles=>this.log.debug(this,'roles',roles))
            .subscribe((roles:RoleDTO[])=>this.roles=roles,
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
