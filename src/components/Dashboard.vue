<template>
  <v-container fluid grid-list-xs pa-0 ma-0 id="dashboard">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-list>
            <ProjectStatus v-for="project in getSelectedProjects" :key="project.id" :project="project"/>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <SelectProject/>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SelectProject from './utility/SelectProject';
import ProjectStatus from './utility/ProjectStatus';

export default {
  name: 'Dashboard',
  components: { ProjectStatus, SelectProject },
  computed: {
    ...mapState([
      'selectedProjects',
    ]),
    ...mapGetters([
      'gitlab_project_query',
      'getSelectedProjects',
    ]),
  },
  created() {
  },
  watch: {
    getSelectedProjects(val) {
      val.forEach(project => this.$store.dispatch('handleProjectLoad', project));
    },
  },
};
</script>
