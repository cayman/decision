/**
 * Created by rustem on 31.08.17.
 */
import Rx from 'rxjs'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

const get = (url) => {
    console.log('url:', url);
    return Rx.Observable.ajax({
            url,
            crossDomain: true,
            responseType: 'json'
        })
        .do(e => console.debug(e))
        .map(e => e.response);
};

const post = (url,body) => {
    console.log('url:', url);
    return Rx.Observable.ajax({
            url,
            method:'POST',
            body,
            crossDomain: true,
            responseType: 'json',
            headers:{ 'Content-Type': 'application/json' }
        })
        .do(e => console.debug(e))
        .map(e => e.response);
};

const param =(id)=> id ? ('/' + id) : '';

export default {
    getCompanies: () => get(`api/companies`).map(list=>list||[]),
    getCompany: (id) => get(`api/companies${param(id)}`),
    getSectors: () => get( `api/sectors`).map(list=>list||[]),
    getLinks: () => get(`api/links`).map(list=>list||[]),
    postLink: (companyId,linkId,body) =>
      post(`api/companies/${companyId}/links${param(linkId)}`,body).map(list=>list||[]),
};
