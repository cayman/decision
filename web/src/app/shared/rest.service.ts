import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {ListDTO} from './list.dto';
import {LogService} from "./log.service";
import {UrlService} from "./url.service";


@Injectable()
export class RestService{

    public AUTH='/api/auth';

    public USERS='/api/users';
    public ROLES='/app/components/role/roles.json';

    public COMPANIES='/api/companies';


    constructor(private http: Http, private log: LogService,private url:UrlService){

    }

    private getUrl = (url:string, id:string|number, suffix=null) => url +  (id ? ('/'+id) : '') + (suffix?'/'+suffix:'');

    private parseError(error: any){
        this.log.warn(this,'error',error);
        try{
            const details = error.json();
            this.log.debug(this,'parsed error',details);
            details.httpStatusCode=details.httpStatusCode || error.status;
            details.httpStatusText=error.statusText;

            if(error.status === 401 && error.url.indexOf(this.AUTH)<0) {
                this.url.navigate([this.url.LOGIN]);
            }

            return Observable.throw(details);
        }catch(ignored){
            return Observable.throw({
                httpStatusCode: error.status,
                httpStatusText:error.statusText,
                message: 'Неверное тело ответа'
            });
        }
    }


    getList<T>(url:string, query:string=null, offset:number=0) : Observable<ListDTO<T>> {
        this.log.log(this,'getList('+url+')', (query ? 'query:'+query : '') + (offset ? 'offset:'+offset : ''));

        const params: URLSearchParams = new URLSearchParams();
        params.set('query', query);
        params.set('offset', offset.toString());

        return this.http.get(url,{ search: params })
            .map((resp:Response)=>{
                return <ListDTO<T>>resp.json();
            })
            .catch(this.parseError.bind(this));
    }

    getArray<T>(url:string,search:URLSearchParams=null) : Observable<T[]> {
        this.log.log(this,'getList('+url+')',search);

        return (search ? this.http.get(url,{ search }) : this.http.get(url))
            .map((resp:Response)=>{
                return <T[]>resp.json();
            })
            .catch(this.parseError.bind(this));
    }

    getItem<T>(url:string, id:string|number) : Observable<T>{

        const api = this.getUrl(url,id);
        this.log.log(this,'get('+api+')');

        return this.http.get(api)
            .map((resp:Response)=>{
                return <T>resp.json();
            })
            .catch(this.parseError.bind(this));
    }


    putItem<T>(url:string, id:string|number, user:T) : Observable<T>{

        const api = this.getUrl(url,id);
        this.log.log(this,'PUT('+api+')',user);

        return this.http.put(api,user) //EDIT
            .map((resp:Response)=>{
                this.log.debug(this,'PUT('+url+')',resp.status);
                return <T>resp.json();
            })
            .catch(this.parseError.bind(this));
    }

    putDetail<T>(url:string, id:string|number, suffix:string, detail:T = null) : Observable<T>{

        const api = this.getUrl(url,id,suffix);
        this.log.debug(this,'PUT('+api+')',detail);

        return this.http.put(api,detail) //EDIT
            .map((resp:Response)=>{
                this.log.debug(this,'PUT('+url+')',resp.status);
                return <T>resp.json();
            })
            .catch(this.parseError.bind(this));
    }



    postItem<T>(url:string,user:T) : Observable<T>{
        this.log.log(this,'POST('+url+')',user);

        return this.http.post(url,user) //ADD
            .map((resp:Response)=>{
                this.log.debug(this,'POST('+url+')',resp.status);
                return <T>resp.json();
            })
            .catch(this.parseError.bind(this));
    }


    deleteItem(url:string, id:string|number) : Observable<String>{

        const api = this.getUrl(url,id);
        this.log.log(this,'DELETE('+api+')');

        return this.http.delete(api) //EDIT
            .map((resp:Response)=>{
                this.log.debug(this,'DELETE('+api+')',resp.status);
                return 'deleted';
            })
            .catch(this.parseError.bind(this));
    }

    deleteAll(url:string) : Observable<String>{
        this.log.log(this,'DELETE('+url+')');
        return this.http.delete(url) //EDIT
            .map((resp:Response)=>{
                this.log.debug(this,'DELETE('+url+')',resp.status);
                return 'deleted';
            })
            .catch(this.parseError.bind(this));
    }
}