/**
 * Created by rustem on 05.09.17.
 */


import company from './company';
import dictionary from './dictionary';
import instrument from './instrument';

export * from './types';
export const actions = Object.assign({}, company,dictionary,instrument);
