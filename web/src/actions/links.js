/**
 * Created by rustem on 31.08.17.
 */
import { api } from './api.js'
import store from '../store.js';

export default {
    fetchLinks(){
        const _links = store.links;
        console.log('fetchLinks',_links);
        _links.loading = true;
        _links.error = null;
        return api.getLinks()
            .do(list =>console.log('links:',list))
            .do(list => _links.list = list)
            .finally(() => _links.loading = false)
            .subscribe(result => {
                console.log('success loaded links');
            }, error=> {
                _links.error = error;
                console.error(error);
            })
    },
}