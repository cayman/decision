import {Injectable} from '@angular/core';
import {RestService,LogService} from "../../shared";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import {UserDTO} from '../user';


@Injectable()
export class AuthRestService{

    constructor(private rest: RestService){ }

    user() : Observable<UserDTO>{
        return this.rest.getItem<UserDTO>(this.rest.AUTH,null); //ADD

    }

    login(credentials:UserDTO) : Observable<UserDTO>{
        return this.rest.postItem<UserDTO>(this.rest.AUTH,credentials); //ADD

    }

    logout() : Observable<string>{
        return this.rest.deleteAll(this.rest.AUTH); //delete
    }

}