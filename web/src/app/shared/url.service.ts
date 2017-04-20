import {Injectable} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LogService} from "./log.service";
import {QueryParams} from "./query.params";
import {ItemParams} from "./item.params";
import {DateParams} from "./date.params";
import {Observable} from "rxjs";


@Injectable()
export class UrlService {

    public HOME = '/';

    public LOGIN = '/login';
    public PASSWORD = '/password';
    public PROFILE = '/profile';

    public USERS = '/users';
    public COMPANIES = '/companies';


    constructor(private activateRoute: ActivatedRoute,
                private router: Router, private log: LogService) {    }


    public navigate(route:any[]){
        this.log.debug(this, 'navigate', route);
        this.router.navigate(route);
    }

    public getParamId = (route:ActivatedRoute): Observable<number> =>
        route.params
            .do((params: Params)=>this.log.log(this, 'params', 'id=' + params['id']))
            .map((params: Params)=>params['id'] && +params['id']>0 ? +params['id'] : 0);

    public getParamLogin = (route:ActivatedRoute): Observable<string> =>
        route.params
            .do((params: Params)=>this.log.log(this, 'params', 'login=' + params['login']))
            .map((params: Params)=>params['login'] && params['login']!=='0' ? params['login'] : null);

    public getQueryParams = (route:ActivatedRoute): Observable<QueryParams> =>
        route.params
            .do((params: Params)=>this.log.log(this, 'params', 'q=' + params['q'], 'n=' + params['n'], 'o=' + params['o']))
            .map((params: Params)=>(<QueryParams>{
                    query: params['q'],
                    order: params['o'],
                    offset: params['n'],
            }));

    public getItemParams = (route:ActivatedRoute): Observable<ItemParams> =>
        route.params
            .do((params: Params)=>this.log.log(this, 'params', 'id=' + params['id'], 'group=' + params['group']))
            .map((params: Params)=>(<ItemParams>{
                id: +params['id'],
                group: +params['group']
            }));


    public getDateParams = (route:ActivatedRoute): Observable<DateParams> =>
        route.params
            .do((params: Params)=>this.log.log(this, 'params', 'm=' + params['m'], 'y=' + params['y']))
            .map((params: Params)=>(<DateParams>{
                year: params['y'] ? +params['y'] : (new Date()).getFullYear(),
                month: params['m'] ? +params['m'] : (new Date()).getMonth(),
            }));

}