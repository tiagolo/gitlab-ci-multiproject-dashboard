<template>
  <v-dialog persistent v-model="openSettings" max-width="500px">
    <v-card>
      <v-card-title>
        Configuration
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Gitlab URL"
          @input="set_gitlab_url"
          :value="gitlab_url">
        </v-text-field>
        <v-text-field
          password
          counter
          label="Gitlab TOKEN"
          @input="set_gitlab_token"
          :value="gitlab_token"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'">
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click="settings=false">Close</v-btn>
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
  computed: {
    openSettings() {
      return this.settings || !this.gitlab_url || !this.gitlab_token;
    },
    ...mapGetters([
      'gitlab_url',
      'gitlab_token',
    ]),
  },
  methods: mapMutations([
    'set_gitlab_url',
    'set_gitlab_token',
  ]),
};
</script>
