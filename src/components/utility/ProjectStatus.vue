<template>
  <div>
    <v-list-tile :key="project.id">
      <v-list-tile-content>
        <v-list-tile-title>
          <h3 class="headline">{{ project.name }} |</h3>
          <span class="subheader pl-2">{{ project.path_with_namespace }}</span>
        </v-list-tile-title>
        <div v-for="(value, key) in sortByKey(project.pipelines)" :key="key+project.id">
          <v-list-tile-sub-title>
            <span><b>{{ key | capitalize }}</b></span>
            <template v-for="item in value">
              <template v-if="key === 'variables'">
                {{ item.key }} - {{ item.value }}
              </template>
              <PipelineStatus :key="item.id" :pipeline="item" :project="project"
                              v-else/>
            </template>
          </v-list-tile-sub-title>
        </div>
        <!--
        <div v-if="project.pipelines">
          <v-list-tile-sub-title v-show="project.pipelines.branches">
            <span><b>Branches</b></span>
            <PipelineStatus v-for="pipeline in project.pipelines.branches" :key="pipeline.id" :pipeline="pipeline"
                            :project="project"/>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title v-show="project.pipelines.tags">
            <span ><b>Tags</b></span>
            <PipelineStatus v-for="pipeline in project.pipelines.tags" :key="pipeline.id" :pipeline="pipeline"
                            :project="project"/>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title v-show="project.pipelines.variables">
            <span>Variables</span>
            <template v-for="variable in project.pipelines.variables">
              {{ variable.key }} - {{ variable.value }}
            </template>
          </v-list-tile-sub-title>
        </div>
        -->
      </v-list-tile-content>
      <v-list-tile-action>
        <v-progress-circular v-if="isFetching"
                             indeterminate color="primary"/>
        <v-btn v-else
               @click="removeProject" icon flat ripple color="error">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider v-show="!isLastItem"></v-divider>
  </div>
</template>

<script>
import PipelineStatus from './PipelineStatus';

export default {
  name: 'ProjectStatus',
  components: { PipelineStatus },
  props: {
    project: {},
    isLastItem: true,
  },
  data() {
    return {
      interval: 0,
      isFetching: false,
    };
  },
  created() {
    this.fetchProject();
    this.interval = setInterval(this.fetchProject, this.$store.getters.refreshDelay * 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    removeProject() {
      this.$store.dispatch('handleRemoveProject', this.project);
    },
    fetchProject() {
      this.isFetching = true;
      // console.log(`Checking update - ${this.project.path_with_namespace}`);
      this.$store.dispatch('handleProjectLoad', this.project)
        .then(() => {
          this.isFetching = false;
        });
    },
    sortByKey(value) {
      const ordered = {};
      Object.keys(value).sort().forEach(key => {
        ordered[ key ] = value[ key ];
      });

      return ordered;
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style>
/*noinspection CssUnusedSymbol*/
.list__tile {
  height: 100% !important;
  padding: .5em 1em .5em;
}

.list__tile__title {
  height: 100% !important;
  padding-bottom: 0.5em;
  display: inline-flex;
  align-items: baseline;
}

</style>
