import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import configuration from './modules/configuration';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    configuration,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
