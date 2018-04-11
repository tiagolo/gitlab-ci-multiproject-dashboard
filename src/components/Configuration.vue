<template>
  <v-dialog v-model="settings" max-width="500px">
    <v-card>
      <v-card-title>
        Configuration
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Gitlab URL"
          :value="gitlab_url"
          @input="setGitlabUrl">
        </v-text-field>
        <v-text-field
          password
          label="Gitlab TOKEN"
          :value="gitlab_token"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          counter >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="settings=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Configuration',
  props: {
    settings: {},
  },
  data() {
    return {
      e1: true,
    };
  },
  computed: mapGetters({
    gitlab_url: 'gitlab_url',
    gitlab_token: 'gitlab_token',
  }),
  methods: mapMutations([
    'setGitlabUrl',
  ]),
};
</script>
