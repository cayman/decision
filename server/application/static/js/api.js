/**
 * Created by rustem on 27.08.17.
 */

const getCompanies = (id) => {
  const url = `api/companies${id ? ('/'+id) : ''}?json=true`;
  console.log('url:',url);
  return Rx.Observable
    .ajax({ url,
      crossDomain: true,
      responseType:'json'
    })
    .map(e => e.response);
};