<template>
    <v-avatar :class="pipeline.status == 'success' ? 'green' : 'red' ">
        <v-icon dark>{{ pipeline.status == 'success' ? 'check' : 'block'}}</v-icon>
    </v-avatar>
</template>
<script>
export default {
  name: 'PipelineStatus',
  props: {
    pipeline: {},
  },
};
</script>
