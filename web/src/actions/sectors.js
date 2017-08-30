/**
 * Created by rustem on 31.08.17.
 */

import store from '../store.js';

export default {
    fetchSectors(){
        const _sectors = store.sectors;
        console.log('fetchSectors',_sectors);
        _sectors.loading = true;
        _sectors.error = null;
        return api.getSectors()
            .do(list =>console.log('sectors:',list))
            .do(list => _sectors.list = list)
            .finally(() => _sectors.loading = false)
            .subscribe(result => {
                console.log('success loaded sectors');
            }, error=> {
                _sectors.error = error;
                console.error(error);
            })
    },
}