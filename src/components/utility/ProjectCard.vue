<template>
  <v-flex>
    <v-card color="blue-grey darken-4" class="white--text flexcard" height="100%">
      <v-card-title primary-title>
        <div>
          <h2 class="headline d-block">{{ project.name }}</h2>
          <div>{{ project.path_with_namespace }}</div>
        </div>
        <v-spacer/>
        <v-progress-circular indeterminate color="blue-grey darken-2" v-if="isFetching"/>
      </v-card-title>
      <v-card-actions class="grow" v-if="project.pipelines">
        <div v-if="project.pipelines.branches">
          <PipelineStatus v-for="pipeline in project.pipelines.branches"
                          :key="pipeline.id" :pipeline="pipeline"
                          :project="project"/>
        </div>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
import PipelineStatus from './PipelineStatus';

export default {
  name: 'ProjectCard',
  components: { PipelineStatus },
  props: {
    project: {},
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
        .then(() => this.isFetching = false);
      // setTimeout(() => this.isFetching = false, 1000);
    },
  },
};
</script>
