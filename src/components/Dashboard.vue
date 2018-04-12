<template>
  <v-container fluid grid-list-xl id="dashboard">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1>{{ message }} - {{ gitlab_url }}</h1>
          </v-card-title>
          <v-card-text>
            <v-form v-on:submit.prevent="onSubmit">
              <v-text-field id="search" name="search" label="Search"
                            v-model="gitlab_query_params.search"
                            @input="fetchProjects()"></v-text-field>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-select single-line
                            autocomplete
                            label="Select"
                            no-data-text="Configure a conexão corretamente"
                            name="Projects"
                            :items="projects"
                            item-text="name_with_namespace"
                            v-model="currentProject">
                  </v-select>
                </v-flex>
                <v-flex xs6>
                  <v-btn @click="handleSelectProject">Get Pipelines</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3>Select Projects</h3>
          </v-card-title>
          <v-card-text>
            <v-list>
              <template v-for="project in selectedProjects">
                <v-list-tile :key="project.id">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ project.id }} - {{ project.name_with_namespace }}
                    </v-list-tile-title>
                    <div v-if="project.pipelines">
                      <v-list-tile-sub-title>
                        <span v-if="project.pipelines.branches">Branches</span>
                        <template v-for="pipeline in project.pipelines.branches">
                          <v-chip :key="pipeline.id">
                            <PipelineStatus :pipeline="pipeline"/>
                            {{ pipeline.ref }}
                          </v-chip>
                        </template>
                      </v-list-tile-sub-title>
                      <v-list-tile-sub-title>
                        <span v-if="project.pipelines.tags">Tags</span>
                        <template v-for="pipeline in project.pipelines.tags">
                          <v-chip :key="pipeline.id">
                            <PipelineStatus :pipeline="pipeline"/>
                            {{ pipeline.ref }}
                          </v-chip>
                        </template>
                      </v-list-tile-sub-title>
                      <!--
                                          <span v-if="project.pipelines.variables">Variables</span>
                                          <ul>
                                            <li v-for="variable in project.pipelines.variables" :key="variable.id">
                                              {{ variable.key }} - {{ variable.value }}
                                            </li>
                                          </ul>
                      -->
                    </div>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn @click="handleRemoveProject(project)" icon flat ripple color="error">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PipelineStatus from './utility/PipelineStatus';

export default {
  name: 'Dashboard',
  components: { PipelineStatus },
  data() {
    return {
      gitlab_query_params: {
        search: '',
        order_by: 'path',
      },
      message: 'GitLab MultiProject Dashboard',
      currentProject: '',
      projects: [{ name_with_namespace: '' }],
      selectedProjects: [],
      name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: null,
      dictionary: {
        attributes: {
          email: 'E-mail Address',
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters',
            // custom messages
          },
          select: {
            required: 'Select field is required',
          },
        },
      },
    };
  },
  computed: {
    gitlab_url() {
      return this.$store.state.configuration.gitlab_url;
    },
    gitlab_token() {
      return this.$store.state.configuration.gitlab_token;
    },
    gitlab_project_query() {
      return Object.keys(this.gitlab_query_params).reduce((string, key) => {
        if (!string.match('=')) {
          string = `${string}=${this.gitlab_query_params[string]}`;
        }
        return `${string}&${key}=${this.gitlab_query_params[key]}`;
      });
    },
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    submit() {

    },
    clear() {
      this.name = '';
      this.email = '';
      this.select = null;
      this.checkbox = null;
      this.$validator.reset();
    },
    // //////
    fetchProjects() {
      fetch(
        `${this.gitlab_url}/api/v4/projects?${
          this.gitlab_project_query
        }&private_token=${this.gitlab_token}`,
      )
        .then(response => response.json())
        .then((json) => {
          this.projects = json;
        });
    },
    handleProjectLoad(project) {
      fetch(
        `${this.gitlab_url}/api/v4/projects/${
          project.id
        }/pipelines?scope=branches&per_page=5&private_token=${
          this.gitlab_token
        }`,
      )
        .then(response => response.json())
        .then((json) => {
          if (json.length) {
            if (!project.pipelines) this.$set(project, 'pipelines', {});
            this.$set(project.pipelines, 'branches', json);
          }
        });

      fetch(
        `${this.gitlab_url}/api/v4/projects/${
          project.id
        }/pipelines?scope=tags&per_page=5&private_token=${this.gitlab_token}`,
      )
        .then(response => response.json())
        .then((json) => {
          if (json.length) {
            if (!project.pipelines) this.$set(project, 'pipelines', {});
            this.$set(project.pipelines, 'tags', json);
          }
        });

      fetch(
        `${this.gitlab_url}/api/v4/projects/${
          project.id
        }/variables?private_token=${this.gitlab_token}`,
      )
        .then(response => response.json())
        .then((json) => {
          if (json.length) {
            if (!project.pipelines) this.$set(project, 'pipelines', {});
            this.$set(
              project.pipelines,
              'variables',
              json, // .filter(item => item.key.startsWith("NEXUS"))
            );
          }
        });
    },
    handleSelectProject() {
      this.selectedProjects.push(this.currentProject);
    },
    handleRemoveProject(project) {
      const i = this.selectedProjects.indexOf(project);
      if (i >= 0) this.selectedProjects.splice(i, 1);
    },
  },
  watch: {
    selectedProjects(val) {
      val.forEach(project => this.handleProjectLoad(project));
    },
  },
};
</script>

<style>
  .list__tile {
    height: 100% !important;
    padding: 1em;
  }
</style>
