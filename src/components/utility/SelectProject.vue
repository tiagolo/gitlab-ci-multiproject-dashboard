<template>
  <v-bottom-sheet inset lazy v-model="ux_sheet">
    <v-btn
      fixed
      bottom
      right
      fab
      dark
      color="pink"
      slot="activator">
      <v-icon>add</v-icon>
    </v-btn>
    <v-flex @mousemove="onMouseMove" @mouseleave="onMouseMove"
            @mouseup="onMouseUp">
      <v-toolbar id="toolbarPanel" color="cyan" dark>
        <v-toolbar-side-icon @mousedown="onMouseDown"></v-toolbar-side-icon>
        <v-text-field
          autofocus
          prepend-icon="search"
          append-icon="close"
          :append-icon-cb="uxToggleSearch"
          label="Search"
          solo-inverted flat
          v-if="ux_isSearchEnabled"
          v-model="search"
          @keyup.esc="uxToggleSearch"
        ></v-text-field>
        <template v-else>
          <v-toolbar-title @click="uxToggleSearch">{{ msgSelectProject }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="uxToggleSearch">
            <v-icon>search</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-list id="projectList" two-line class="scroll-y" :style="{maxHeight: this.ux_height + 'px'}">
        <template v-for="item in filteredAvailableProjects">
          <v-list-tile :key="item.name_with_namespace" avatar>
            <v-list-tile-action>
              <v-checkbox
                readonly
                :value="item.id"
                :id="'ch'+item.id"
                v-model="selectedProjects"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-avatar color="blue">
              <img :src="item.avatar_url" v-if="item.avatar_url">
              <v-card-text v-else>{{item.name.substring(0,1).toUpperCase()}}</v-card-text>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.path_with_namespace"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SelectProject',
  data() {
    return {
      ux_sheet: false,
      ux_isDragging: false,
      ux_startY: null,
      ux_startHeight: null,
      ux_height: 400,
      ux_isSearchEnabled: false,
      search: '',
      msgSelectProject: 'Selecione o Projeto',
    };
  },
  computed: {
    ...mapGetters([
      'getAvailableProjects',
    ]),
    filteredAvailableProjects() {
      let availableProjects = this.getAvailableProjects;
      if (this.search) {
        availableProjects = this.getAvailableProjects.filter(p => p.path_with_namespace.includes(this.search));
      }
      return availableProjects;
    },
    selectedProjects: {
      get() {
        return this.$store.getters.getSelectedProjects.map(item => item.id);
      },
      set(val) {
        this.$store.dispatch('selectProjectsById', val);
      },
    },
  },
  watch: {
    ux_sheet(val) {
      if (val) {
        this.fetchAvailableProjects();
      }
    },
  },
  methods: {
    ...mapActions([
      'fetchAvailableProjects',
    ]),
    uxToggleSearch() {
      this.ux_isSearchEnabled = !this.ux_isSearchEnabled;
      if (!this.ux_isSearchEnabled) this.search = '';
    },
    onMouseDown(event) {
      this.ux_isDragging = true;
      this.ux_startY = event.pageY;
      this.ux_startHeight = this.ux_height;
    },
    onMouseMove(event) {
      if (this.ux_isDragging) {
        const dx = event.pageY - this.ux_startY;
        this.ux_height = this.ux_startHeight - dx;
        // console.log(`DX: ux_startY: ${this.ux_startY} | pageY: ${event.pageY}`)
        // console.log(`rawHeight: toolbar: ${toolbarPanel.offsetHeight} | list: ${projectList.offsetHeight} `)
        // console.log(`ux_height: ${totalHeight} - ${dx} = ${this.ux_height}`);
      }
    },
    onMouseUp() {
      this.ux_isDragging = false;
    },
  },
};
</script>
