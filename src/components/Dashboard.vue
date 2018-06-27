<template>
  <v-container fluid grid-list-xs pa-0 ma-0 id="dashboard">

    <v-container grid-list-xs fluid v-show="getSelectedProjects.length" v-if="viewType">
      <v-layout row wrap d-flex>
        <ProjectCard v-for="project in getSelectedProjects" :key="project.id" :project="project"/>
      </v-layout>
    </v-container>

    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-list v-show="getSelectedProjects.length">
            <ProjectStatus v-for="(project, index) in getSelectedProjects" :key="project.id" :project="project"
                           :is-last-item="isLastItem(index)"/>
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
import ProjectCard from './utility/ProjectCard';

export default {
  name: 'Dashboard',
  components: { ProjectCard, ProjectStatus, SelectProject },
  computed: {
    ...mapGetters([
      'gitlab_project_query',
      'getSelectedProjects',
      'viewType',
    ]),
  },
  methods: {
    isLastItem(index) {
      return this.getSelectedProjects.length === index + 1;
    },
  },
};
</script>

