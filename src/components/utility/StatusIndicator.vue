<template>
    <v-avatar :class="[{ animation: isRunning }, getPipelineStatusColor]" >
        <v-icon dark  >{{ getPipelineStatusIcon }}</v-icon>
    </v-avatar>
</template>
<script>
export default {
  name: 'PipelineStatus',
  props: {
    pipeline: {},
  },
  computed: {
    isRunning() {
      return this.pipeline.status === 'running';
    },
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
        case 'manual':
          return 'grey'
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
        case 'manual':
          return 'fingerprint'
        default:
          return 'remove';
      }
    },
  },
};
</script>

<style scoped>

.animation {
  animation-name: flashIcon;
  animation-duration: 0.5s;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
}

@keyframes flashIcon {
  from {opacity: 1;}
  to {opacity: 0.2;}
}

</style>
