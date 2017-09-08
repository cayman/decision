/**
 * Created by rustem on 05.09.17.
 */

import {Observable} from "rxjs/Observable";
import * as mt from '../store/types';
import * as types from './types';
import {GET,POST}  from './api';

export default {

    [types.FETCH_LINKS]: ({commit})=> {
        const name = 'links';
        commit(mt.LOADING, {name});
        return GET(`links`)
            .do(list => console.log(types.FETCH_LINKS, list))
            .map(list=>list || [])
            .do(list => commit(mt.SET_DICTIONARY, {name, list}))
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name,
                    error:{title:'Загрузка ссылок',text:error }
                })
            );
    },
    [types.FETCH_INSTRUMENT_TYPES]: ({commit})=> {
        const name = 'instrumentTypes';
        commit(mt.LOADING, {name});
        return GET(`instrument_types`)
            .do(list => console.log(types.FETCH_INSTRUMENT_TYPES, list))
            .map(list=>list || [])
            .do(list => commit(mt.SET_DICTIONARY, {name, list}))
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name,
                    error:{title:'Загрузка типов иструментов',text:error }
                })
            );
    },

    [types.FETCH_SECTORS]: ({commit})=> {
        const name = 'sectors';
        commit(mt.LOADING, {name});
        return GET(`sectors`)
            .do(list => console.log(types.FETCH_SECTORS, list))
            .map(list=>list || [])
            .do(list => commit(mt.SET_DICTIONARY, {name, list}))
            .subscribe(result => commit(mt.LOADED, {name}),
                error => commit(mt.LOADED, {name,
                    error:{title:'Загрузка секторов',text:error }
                })
            );
    },
}