<template>
  <v-container fluid grid-list-xl id="dashboard">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1>{{ message }}</h1>
          </v-card-title>
          <v-card-text>
            <v-form v-on:submit.prevent="onSubmit">
              <v-text-field id="search" name="search" label="Search" v-model="gitlab_query_params.search"
                            @change="fetchProjects()"></v-text-field>
              <input name="search"/>
              <v-layout row wrap>
                <v-flex xs6>
                  <select name="Projects" id="cbx_projects" v-model="currentProject">
                    <option value="" disabled>Carregando Projetos ...</option>
                    <option v-for="project in projects" :key="project.id" :value="project">
                      {{project.namespace.full_path}}/{{project.name}}
                    </option>
                  </select>
                  <v-select single-line
                            autocomplete
                            label="Select"
                            name="Projects"
                            :items="projects"
                            item-text="name_with_namespace"
                            v-model="currentProject">
                    <template slot="item" slot-scope="data">
                      <v-list-tile-content>
                        {{data.item.namespace.full_path}}/{{data.item.name}}
                      </v-list-tile-content>
                    </template>
                  </v-select>
                </v-flex>
                <v-flex xs6>
                  <button @click="handleSelectProject">Get Pipelines</button>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div>
              <v-list>
                <v-list-tile v-for="project in selectedProjects" :key="project.id">
                  {{ project.id }} - {{ project.name_with_namespace }}
                  <v-btn @click="handleRemoveProject(project)">Remover</v-btn>
                  <transition name="fade">
                    <div v-if="project.pipelines">
                      <span v-if="project.pipelines.branches">Branches</span>
                      <ul>
                        <li v-for="pipeline in project.pipelines.branches" :key="pipeline.id">
                          {{ pipeline.id }} - {{ pipeline.ref }} - {{ pipeline.status }}
                        </li>
                      </ul>
                      <span v-if="project.pipelines.tags">Tags</span>
                      <ul>
                        <li v-for="pipeline in project.pipelines.tags" :key="pipeline.id">
                          {{ pipeline.id }} - {{ pipeline.ref }} - {{ pipeline.status }}
                        </li>
                      </ul>
                      <span v-if="project.pipelines.variables">Variables</span>
                      <ul>
                        <li v-for="variable in project.pipelines.variables" :key="variable.id">
                          {{ variable.key }} - {{ variable.value }}
                        </li>
                      </ul>
                    </div>
                  </transition>
                </v-list-tile>
              </v-list>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        gitlab_url: 'https://gitlab.com',
        gitlab_token: 'jupaPqZjhbGo59Bk91ig',
        gitlab_query_params: {
          search: '',
          order_by: 'path',
        },
        message: 'GitLab MultiProject Dashboard',
        currentProject: '',
        projects: [],
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

<style scoped>
</style>
