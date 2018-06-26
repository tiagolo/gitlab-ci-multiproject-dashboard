<template>
  <v-container fluid grid-list-xs pa-0 ma-0 id="dashboard">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-list v-show="getSelectedProjects.length">
            <ProjectStatus v-for="(project, index) in getSelectedProjects" :key="project.id" :project="project" :is-last-item="isLastItem(index)"/>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <SelectProject/>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectProject from './utility/SelectProject';
import ProjectStatus from './utility/ProjectStatus';

export default {
  name: 'Dashboard',
  components: { ProjectStatus, SelectProject },
  computed: {
    ...mapGetters([
      'gitlab_project_query',
      'getSelectedProjects',
    ]),
  },
  methods: {
    isLastItem(index) {
      return this.getSelectedProjects.length === index + 1;
    },
  },
};
</script>
