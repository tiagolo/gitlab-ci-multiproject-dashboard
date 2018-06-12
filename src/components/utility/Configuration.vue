<template>
  <v-dialog persistent :value="openSettings" max-width="500px">
    <v-btn icon slot="activator" @click.stop="opened = true">
      <v-icon>settings</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        Configuration
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Gitlab URL"
          @input="setGitlabUrl"
          :value="gitlabUrl">
        </v-text-field>
        <v-text-field
          password
          counter
          label="Gitlab TOKEN"
          @input="setGitlabToken"
          :value="gitlabToken"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'">
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click="opened = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Configuration',
  data() {
    return {
      e1: true,
      opened: false,
    };
  },
  computed: {
    openSettings() {
      // this.opened = !this.gitlabUrl || !this.gitlabToken ?: true
      return this.opened || !this.gitlabUrl || !this.gitlabToken;
    },
    ...mapGetters([
      'gitlabUrl',
      'gitlabToken',
    ]),
  },
  methods: {
    ...mapMutations([
      'setGitlabUrl',
      'setGitlabToken',
    ]),
  },
};
</script>
