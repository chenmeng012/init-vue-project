import Vue from 'vue';
import Vuex from 'vuex';

import * as index from './modules/index/index';
import * as admin from './modules/admin/index';

import {mergeStateModules} from "../libs/mergeStates";

Vue.use(Vuex);

let states = mergeStateModules(index, admin);
const store = new Vuex.Store({
  ...states
});

export default store;
