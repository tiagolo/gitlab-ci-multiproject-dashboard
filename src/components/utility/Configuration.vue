<template>
  <v-dialog persistent :value="openSettings" max-width="500px">
    <v-btn icon slot="activator" @click.stop="opened = true">
      <v-icon>settings</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">Configuration</v-card-title>
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
        <v-container fluid grid-list-xs>
          <v-layout row wrap class="align-baseline align-content-end justify-end">
            <v-flex xs3>
              <v-text-field type="number"
                            label="Refresh Delay"
                            :step="5"
                            :min="5"
                            :max="60"
                            :value="refreshDelay"
                            @input="setRefreshDelay"/>
            </v-flex>
            <v-flex xs9>
              <v-slider thumb-label
                        class="pa-0"
                        :step="5"
                        :min="5"
                        :max="60"
                        :value="refreshDelay"
                        @input="setRefreshDelay"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click="opened = false">Close</v-btn>
        <v-spacer/>
        <v-btn color="error" @click="reset = true">Reset Dashboard</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="reset" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirmation for reset dashboard?</v-card-title>
        <v-card-text>
          This process removes all projects from the dashboard and available projects in search list,
          please confirm to continue?
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="green darken-1" flat="flat" @click="reset = false">Cancel</v-btn>
          <v-btn color="error darken-1" @click="$store.dispatch('handleClearSelectedProjects').then(reset = false)">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      reset: false,
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
      'refreshDelay',
    ]),
  },
  methods: {
    ...mapMutations([
      'setGitlabUrl',
      'setGitlabToken',
      'setRefreshDelay',
    ]),
  },
};
</script>
