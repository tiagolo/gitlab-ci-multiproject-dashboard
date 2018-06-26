<template>
  <v-container fluid grid-list-xs pa-0 ma-0 id="dashboard">
    <v-container grid-list-xs fluid>
      <v-layout row wrap d-flex>
        <v-flex v-for="(project, index) in getSelectedProjects" :key="project.id">
          <v-card color="blue-grey darken-2" class="white--text flexcard" height="100%">
            <v-card-title primary-title >
              <div>
                <h2 class="headline d-block">{{ project.name }}</h2>
                <div>{{ project.path_with_namespace }}</div>
              </div>
            </v-card-title>
            <v-card-actions class="grow">
              <div>
                <template v-for="pipeline in project.pipelines.branches">
                  <v-chip :key="pipeline.id" @click="openPipeline(pipeline)">
                    <PipelineStatus :pipeline="pipeline"/>
                    {{ pipeline.ref }}
                  </v-chip>
                </template>
              </div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

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
import PipelineStatus from './utility/PipelineStatus';

export default {
  name: 'Dashboard',
  components: { ProjectStatus, PipelineStatus, SelectProject },
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

<style scoped>
  .flexcard {
    display: flex;
    flex-direction: column;
  }
</style>
