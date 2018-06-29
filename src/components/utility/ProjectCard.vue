<template>
  <v-flex>
    <v-card color="blue-grey darken-3" class="white--text flexcard" height="100%">
      <v-progress-linear :indeterminate="isFetching"
                         color="purple" background-opacity="0"
                         height="6" class="py-0 my-0"/>
      <v-card-title primary-title class="pt-2">
        <div>
          <h2 class="headline d-block">{{ project.name }}</h2>
          <div>{{ project.path_with_namespace }}</div>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-card-actions class="grow" v-if="project.pipelines">
        <div v-if="project.pipelines.branches">
          <h3 class="subheading">Branches</h3>
          <PipelineStatus v-for="pipeline in project.pipelines.branches"
                          :key="pipeline.id" :pipeline="pipeline"
                          :project="project"/>
        </div>
      </v-card-actions>
      <v-card-actions class="grow" v-if="project.pipelines">
        <div v-if="project.pipelines.tags">
          <h3 class="subheading">Tags</h3>
          <PipelineStatus v-for="pipeline in project.pipelines.tags"
                          :key="pipeline.id" :pipeline="pipeline"
                          :project="project"/>
        </div>
      </v-card-actions>
      <v-card-actions class="grow" v-if="project.pipelines">
        <div v-if="project.pipelines.environments">
          <h3 class="subheading">Environments</h3>
          <PipelineStatus v-for="pipeline in project.pipelines.environments"
                          :key="pipeline.id" :pipeline="pipeline" objecttype="environments"
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
