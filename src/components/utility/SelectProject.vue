<template>
  <v-bottom-sheet inset>
    <v-btn
      fixed
      bottom
      right
      fab
      dark
      color="pink"
      slot="activator">
      <v-icon>add</v-icon>
    </v-btn>
    <v-flex >
      <v-card>
        <v-card-title>
          <h1>{{ msgSelectProject }}</h1>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleSelectProject" grid-list-xs>
            <v-layout row wrap>
              <v-flex xs11>
                <v-select single-line
                          autocomplete
                          clearable
                          open-on-clear
                          name="Projects"
                          label="Select"
                          item-text="name_with_namespace"
                          no-data-text="Sem registros encontrados ..."
                          :items="projects"
                          :search-input.sync="search"
                          @keyup.enter.native="handleSelectProject"
                          v-model="currentProject">
                </v-select>
              </v-flex>
              <v-flex xs1>
                <v-btn fab><v-icon dark>done</v-icon></v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SelectProject',
  data() {
    return {
      gitlab_query_params: {
        search: '',
        order_by: 'path',
        membership: true,
      },
      currentProject: null,
      search: '',
      projects: [{ name_with_namespace: '' }],
      msgSelectProject: 'Selecione o Projeto',
    };
  },
  computed: {
    // ...mapGetters([
    //   'projects',
    // ]),
    // gitlab_project_query() {
    //   return Object.keys(this.gitlab_query_params).reduce((previousValue, currentValue) => {
    //     let queryString = '';
    //     console.log(previousValue, currentValue);
    //     if (!previousValue.match('=')) {
    //       queryString = `${previousValue}=${this.gitlab_query_params[previousValue]}`;
    //     }
    //     return `${queryString}&${currentValue}=${this.gitlab_query_params[currentValue]}`;
    //   });
    // },
  },
  // watch: {
  //   search(val) {
  //     if (val) this.gitlab_query_params.search = val;
  //     this.fetchProjects();
  //     console.log('Watcher Fetching projects');
  //   },
  // },
  // actions: {
  //   fetchProjects() {
  //     fetch(
  //       `${this.gitlabUrl}/api/v4/projects?${this.gitlab_project_query}&private_token=${this.gitlabToken}`,
  //     )
  //       .then(response => response.json())
  //       .then((json) => {
  //         this.projects = json;
  //       });
  //   },
  // },
};
</script>
