<template>
  <div>
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
        <v-btn @click="" icon flat ripple color="error">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider></v-divider>
  </div>
</template>

<script>
import PipelineStatus from './PipelineStatus';

export default {
  name: 'ProjectStatus',
  components: { PipelineStatus },
  props: {
    project: {},
  },
};
</script>

<style >
/*noinspection CssUnusedSymbol*/
.list__tile {
  height: 100% !important;
  padding: 1em;
}
</style>

