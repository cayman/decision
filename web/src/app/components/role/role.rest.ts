import {Injectable} from '@angular/core';
import {RestService,LogService,ListDTO} from "../../shared";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import {RoleDTO} from './role.dto';


@Injectable()
export class RoleRestService{

    constructor(private rest: RestService){ }

    getSortedArray() : Observable<RoleDTO[]>{
        return this.rest.getArray(this.rest.ROLES)
            .map((items:RoleDTO[]) => items)
            .map((items:RoleDTO[]) => items.sort((a,b)=>a.name<b.name?-1:1));
    }

}