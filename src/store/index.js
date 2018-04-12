import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import createLogger from 'vuex/dist/logger';

import configuration from './modules/configuration';

Vue.use(Vuex);
// Vue.use(VuexPersistence);

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    configuration,
  },
  strict: debug,
  plugins: debug ? [createLogger, vuexLocal.plugin] : [vuexLocal.plugin],
});
