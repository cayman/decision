/**
 * Created by rustem on 05.09.17.
 */

import {Observable} from "rxjs/Observable";
import * as mt from '../store/types';
import * as types from './types';
import {GET,POST}  from './api';

export default {

    [types.CREATE_POST]: ({commit,getters},params)=> {
        const name = 'post';
        commit(mt.LOADING, {name});
        return POST(`posts`, params)
            .do(post => console.log(types.CREATE_POST, post))
            .do(post => commit(mt.SET_POST, post))
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name,
                    error:{title:'Создание заметки',text:error }
                })
            );
    },
    [types.UPDATE_POST]: ({commit,getters},params)=> {
        const name = 'post';
        commit(mt.LOADING, {name});
        return POST(`posts/${params.id}`, params)
            .do(post => console.log(types.UPDATE_POST, post))
            .do(post => commit(mt.SET_POST, post))
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name,
                    error:{title:'Изменение заметки',text:error
                }})
            );
    }
}