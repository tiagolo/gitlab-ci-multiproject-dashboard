<template>
  <v-app id="app">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp"
                         fixed app v-model="drawer">
    </v-navigation-drawer>

    <v-toolbar color="purple darken-3" dark app
               :clipped-left="$vuetify.breakpoint.lgAndUp" fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title> GitLab Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="settings = !settings">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content >
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>

    <v-footer app dark color="purple darken-4" >
      <v-container fluid text-xs-center grid-list-xs>{{now()}}</v-container>
    </v-footer>

    <Configuration :settings="settings"/>
  </v-app>
</template>

<script>
import Configuration from './components/Configuration';

export default {
  name: 'App',
  components: { Configuration },
  data() {
    return {
      settings: false,
      drawer: false,
    };
  },
  methods: {
    now() {
      return new Date(Date.now()).toLocaleString();
    },
  },
};
</script>
