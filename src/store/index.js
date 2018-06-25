import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import createLogger from 'vuex/dist/logger';

import configuration from './modules/configuration';
import projects from './modules/projects';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  strictMode: debug,
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    configuration,
    projects,
  },
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  strict: debug,
  plugins: debug ? [createLogger, vuexLocal.plugin] : [vuexLocal.plugin],
});
