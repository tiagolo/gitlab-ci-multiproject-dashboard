<template>
  <v-app id="app">
    <v-toolbar color="purple darken-3" dark app
               :clipped-left="$vuetify.breakpoint.lgAndUp" fixed>
      <v-toolbar-title>GitLab Dashboard - {{ gitlabUrl }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon flat ripple @click="viewType = !viewType">
        <v-icon>{{ viewType ? 'view_list' : 'dashboard' }}</v-icon>
      </v-btn>
      <Configuration/>
    </v-toolbar>

    <v-content>
      <v-container fluid >
        <router-view/>
      </v-container>
    </v-content>

    <v-footer app dark color="purple darken-4">
      <v-container fluid text-xs-center grid-list-xs>{{now}}</v-container>
    </v-footer>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

import Configuration from './components/utility/Configuration';

export default {
  name: 'App',
  components: { Configuration },
  computed: {
    ...mapGetters([
      'gitlabUrl',
    ]),
    now: () => new Date(Date.now()).toLocaleString(),
    viewType: {
      get() {
        return this.$store.getters.viewType;
      },
      set(type) {
        this.$store.commit('setViewType', type);
      },
    },
  },
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
