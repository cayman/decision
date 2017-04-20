import {Injectable} from '@angular/core';
import {QueryParams, RestService,LogService,ListDTO} from "../../shared";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import {UserDTO} from './user.dto';

@Injectable()
export class UserRestService{

    constructor(private rest: RestService){}

    getList(params: QueryParams) : Observable<ListDTO<UserDTO>>{
        return this.rest.getList<UserDTO>(this.rest.USERS,params.query,params.offset)
    }

    getItem(id:number) : Observable<UserDTO>{
        return id>0 ?
            this.rest.getItem<UserDTO>(this.rest.USERS,id):
            Observable.of(new UserDTO());

    }


    saveItem(id:number, user:UserDTO) : Observable<UserDTO>{
        return id>0 ?
            this.rest.putItem<UserDTO>(this.rest.USERS,id,user): //EDIT
            this.rest.postItem<UserDTO>(this.rest.USERS,user); //ADD

    }

    removeItem(id:number) : Observable<string>{
        return this.rest.deleteItem(this.rest.USERS,id); //delete

    }
}