<template>
    <v-chip :key="pipeline.id" @click="openPipeline">
        <StatusIndicator :pipeline="pipeline"/>
        {{ pipeline.ref }}
    </v-chip>
</template>
<script>
import StatusIndicator from './StatusIndicator';

export default {
  name: 'PipelineStatus',
  components: { StatusIndicator },
  props: {
    project: {},
    pipeline: {},
  },
  methods: {
    openPipeline() {
      window.open(`${this.project.web_url}/pipelines/${this.pipeline.id}`, '_blank');
    },
  },
};
</script>

<style>
.chip .chip__content{
  cursor: pointer;
}
</style>
