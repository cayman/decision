/**
 * Created by rustem on 31.08.17.
 */

export const api = {
    getCompanies: (id) => {
        const url = `api/companies${id ? ('/' + id) : ''}?json=true`;
        console.log('url:', url);
        return Rx.Observable
            .ajax({
                url,
                crossDomain: true,
                responseType: 'json'
            })
            .map(e => e.response);
    },
    getSectors: () => {
        const url = `api/sectors`;
        console.log('url:', url);
        return Rx.Observable
            .ajax({
                url,
                crossDomain: true,
                responseType: 'json'
            })
            .map(e => e.response);
    },
    getLinks: () => {
        const url = `api/links`;
        console.log('url:', url);
        return Rx.Observable
            .ajax({
                url,
                crossDomain: true,
                responseType: 'json'
            })
            .map(e => e.response);
    },
    updateCompanyLinks: (companyId,linkId,body) => {
        const url = `api/companies/${companyId}/links${linkId ? ('/' + linkId) : ''}`;
        console.log('url:', url);
        return Rx.Observable
            .ajax({
                url,
                method:'POST',
                body,
                crossDomain: true,
                responseType: 'json',
                headers:{ 'Content-Type': 'application/json' }

            })
            .map(e => e.response);
    }
};
