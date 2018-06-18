<template>
  <v-container fluid grid-list-xs pa-0 ma-0 id="dashboard">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3>Select Projects</h3>
          </v-card-title>
          <v-card-text>
            <v-list>
              <template v-for="project in getAvailableProjects">
                <v-list-tile :key="project.id">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ project.id }} - {{ project.name_with_namespace }}
                    </v-list-tile-title>
                    <div v-if="project.pipelines">
                      <v-list-tile-sub-title>
                        <span v-if="project.pipelines.branches">Branches</span>
                        <template v-for="pipeline in project.pipelines.branches">
                          <v-chip :key="pipeline.id">
                            <PipelineStatus :pipeline="pipeline"/>
                            {{ pipeline.ref }}
                          </v-chip>
                        </template>
                      </v-list-tile-sub-title>
                      <v-list-tile-sub-title>
                        <span v-if="project.pipelines.tags">Tags</span>
                        <template v-for="pipeline in project.pipelines.tags">
                          <v-chip :key="pipeline.id">
                            <PipelineStatus :pipeline="pipeline"/>
                            {{ pipeline.ref }}
                          </v-chip>
                        </template>
                      </v-list-tile-sub-title>
                      <v-list-tile-sub-title>
                        <span v-if="project.pipelines.variables">Variables</span>
                        <template v-for="variable in project.pipelines.variables">
                          {{ variable.key }} - {{ variable.value }}
                        </template>
                      </v-list-tile-sub-title>
                    </div>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn @click="handleRemoveProject(project)" icon flat ripple color="error">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <SelectProject/>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PipelineStatus from './utility/PipelineStatus';
import SelectProject from './utility/SelectProject';

export default {
  name: 'Dashboard',
  components: { SelectProject, PipelineStatus },
  computed: {
    ...mapState([
      'selectedProjects',
    ]),
    ...mapGetters([
      'gitlab_project_query',
      'getAvailableProjects',
    ]),
  },
  created() {
  },
  watch: {
    selectedProjects(val) {
      val.forEach(project => this.handleProjectLoad(project));
    },
  },
  methods: {
    ...mapActions([
      'fetchAvailableProjects',
      // 'handleRemoveProject',
    ]),
  },
};
</script>

<style>
/*noinspection CssUnusedSymbol*/
.list__tile {
  height: 100% !important;
  padding: 1em;
}
</style>
