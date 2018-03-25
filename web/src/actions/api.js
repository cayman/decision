/**
 * Created by rustem on 31.08.17.
 */

import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounce';
import 'rxjs/observable/dom/ajax';
import 'rxjs/observable/dom/AjaxObservable';

const baseUrl = '/api';

export const GET = (localUrl) => {
    const url = [baseUrl,localUrl].join('/');
    console.log('url:', url);
    return Observable.ajax({
            url,
            crossDomain: true,
            responseType: 'json'
        })
        .do(e => console.debug(e))
        .map(e => e.response);
};

export const POST = (localUrl,body) => {
    const url = [baseUrl,localUrl].join('/');
    console.log('url:', url);
    return Observable.ajax({
            url,
            method:'POST',
            body,
            crossDomain: true,
            responseType: 'json',
            headers:{ 'Content-Type': 'application/json'}
        })
        .do(e => console.debug(e))
        .map(e => e.response);
};

