/**
 * Created by rustem on 05.09.17.
 */


import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

import { actions } from '../actions';
import * as getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})