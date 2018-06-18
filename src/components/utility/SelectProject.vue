<template>
  <v-bottom-sheet inset lazy v-model="sheet">
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
            @mouseup="onMouseUp" >
      <v-toolbar id="toolbarPanel" color="cyan" dark>
        <v-toolbar-side-icon @mousedown="onMouseDown"></v-toolbar-side-icon>
        <v-toolbar-title>{{ msgSelectProject }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list id="projectList" two-line class="scroll-y" :style="{maxHeight: this.height + 'px'}">
        <template v-for="item in getAvailableProjects">
          <!--<v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>-->
          <!--<v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>-->
          <v-list-tile :key="item.name_with_namespace" avatar @click="">
            <v-list-tile-action>
              <v-checkbox
                readonly
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
      sheet: false,
      currentProject: null,
      search: '',
      projects: [ { name_with_namespace: '' } ],
      msgSelectProject: 'Selecione o Projeto',
      isDragging: false,
      startY: null,
      startHeight: null,
      height: 400,
    };
  },
  computed: {
    ...mapGetters([
      'getAvailableProjects',
    ]),
  },
  watch: {
    sheet(val) {
      if (val) {
        this.fetchAvailableProjects();
      }
    },
  },
  methods: {
    ...mapActions([
      'fetchAvailableProjects',
    ]),
    onMouseDown(event) {
      console.log(event);
      this.isDragging = true;
      this.startY = event.pageY;
      this.startHeight = this.height;
    },
    onMouseMove(event) {
      if (this.isDragging) {
        const dx = event.pageY - this.startY;
        this.height = this.startHeight - dx;

        // console.log(`DX: startY: ${this.startY} | pageY: ${event.pageY}`)
        // console.log(`rawHeight: toolbar: ${toolbarPanel.offsetHeight} | list: ${projectList.offsetHeight} `)
        // console.log(`height: ${totalHeight} - ${dx} = ${this.height}`);
      }
    },
    onMouseUp() {
      this.isDragging = false;
    },
  },
};
</script>
