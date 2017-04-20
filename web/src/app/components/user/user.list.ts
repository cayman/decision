import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UrlService,LogService,ListDTO} from "../../shared";

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import {UserRestService} from './user.rest';
import {UserDTO} from './user.dto';

@Component({
    selector: 'user-list',
    templateUrl: 'user.list.html'
})
export class UserList implements OnInit, OnDestroy {

    public query: string;
    private subscription: Subscription;

    list: ListDTO<UserDTO>;
    fetching:boolean;

    error:any;

    constructor(private userRest: UserRestService, private log: LogService,
                public url: UrlService, private route: ActivatedRoute){
        this.log.debug(this);
        this.subscription = this.url.getQueryParams(route)
            .do(params => this.query=params.query)
            .do(()=>this.fetching=true)
            .switchMap(params => this.userRest.getList(params))
            .do(list=>this.log.debug(this,'users',list))
            .finally(()=>this.fetching=false)
            .subscribe((list:ListDTO<UserDTO>)=>this.list=list,
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
