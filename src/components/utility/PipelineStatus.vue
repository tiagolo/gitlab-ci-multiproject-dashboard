<template>
    <v-avatar :class="getPipelineStatusColor">
        <v-icon dark>{{ getPipelineStatusIcon }}</v-icon>
    </v-avatar>
</template>
<script>
export default {
  name: 'PipelineStatus',
  props: {
    pipeline: {},
  },
  computed: {
    getPipelineStatusColor() {
      switch (this.pipeline.status) {
        case 'success':
          return 'green';
        case 'failed':
          return 'red'
        case 'pending':
          return 'orange'
        case 'running':
          return 'blue'
        default:
          return 'grey darken-1';
      }
    },
    getPipelineStatusIcon() {
      switch (this.pipeline.status) {
        case 'success':
          return 'check';
        case 'failed':
          return 'block'
        case 'pending':
          return 'pause'
        case 'running':
          return 'play_arrow'
        default:
          return 'remove';
      }
    },
  },
};
</script>
