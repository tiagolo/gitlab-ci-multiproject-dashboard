<template>
  <div id="app">
        <h1>{{ message }}</h1>
        <select name="Projects" id="cbx_projects" v-model="currentProject">
            <option value="" disabled>Carregando Projetos ...</option>
            <option v-for="project in projects" :key="project.id" :value="project">
                {{project.namespace.full_path}}/{{project.name}}
            </option>
        </select>
        <button @click="handleSelectProject">Get Pipelines</button>
        <ul>
            <li v-for="project in selectedProjects" :key="project.id">
                {{ project.id }} - {{ project.name_with_namespace }} <button @click="handleRemoveProject(project)">Remover</button>
                <transition name="fade">
                    <div v-if="project.pipelines">
                        <span v-if="project.pipelines.branches">Branches</span>
                        <ul>
                            <li v-for="pipeline in project.pipelines.branches">
                                {{ pipeline.id }} - {{ pipeline.ref }} - {{ pipeline.status }}
                            </li>
                        </ul>
                        <span v-if="project.pipelines.tags">Tags</span>
                        <ul>
                            <li v-for="pipeline in project.pipelines.tags">
                                {{ pipeline.id }} - {{ pipeline.ref }} - {{ pipeline.status }}
                            </li>
                        </ul>
                        <span v-if="project.pipelines.variables">Variables</span>
                        <ul>
                            <li v-for="variable in project.pipelines.variables">
                                {{ variable.key }} - {{ variable.value }}
                            </li>
                        </ul>
                    </div>
                </transition>
            </li>
        </ul>
        <footer>{{now()}}</footer>
    </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      gitlab_url: "https://gitlab.com",
      gitlab_token: "",
      gitlab_query_params: {
        owned: true,
        order_by: "path"
      },
      message: "GitLab MultiProject Dashboard",
      currentProject: "",
      projects: [],
      selectedProjects: []
    };
  },
  computed: {
    gitlab_project_query() {
      return Object.keys(this.gitlab_query_params).reduce((string, key) => {
        if (!string.match("="))
          string = `${string}=${this.gitlab_query_params[string]}`;
        return string + `&${key}=${this.gitlab_query_params[key]}`;
      });
    }
  },
  created() {
    fetch(
      `${this.gitlab_url}/api/v4/projects?${
        this.gitlab_project_query
      }&private_token=${this.gitlab_token}`
    )
      .then(response => response.json())
      .then(json => {
        this.projects = json;
      });
  },
  methods: {
    handleProjectLoad: function(project) {
      fetch(
        `${this.gitlab_url}/api/v4/projects/${
          project.id
        }/pipelines?scope=branches&per_page=5&private_token=${
          this.gitlab_token
        }`
      )
        .then(response => response.json())
        .then(json => {
          if (json.length) {
            if (!project.pipelines) this.$set(project, "pipelines", {});
            this.$set(project.pipelines, "branches", json);
          }
        });

      fetch(
        `${this.gitlab_url}/api/v4/projects/${
          project.id
        }/pipelines?scope=tags&per_page=5&private_token=${this.gitlab_token}`
      )
        .then(response => response.json())
        .then(json => {
          if (json.length) {
            if (!project.pipelines) this.$set(project, "pipelines", {});
            this.$set(project.pipelines, "tags", json);
          }
        });

      fetch(
        `${this.gitlab_url}/api/v4/projects/${
          project.id
        }/variables?private_token=${this.gitlab_token}`
      )
        .then(response => response.json())
        .then(json => {
          if (json.length) {
            if (!project.pipelines) this.$set(project, "pipelines", {});
            this.$set(
              project.pipelines,
              "variables",
              json.filter(item => item.key.startsWith("NEXUS"))
            );
          }
        });
    },
    handleSelectProject: function() {
      this.selectedProjects.push(this.currentProject);
    },
    handleRemoveProject: function(project) {
      let i = this.selectedProjects.indexOf(project);
      if (i >= 0) this.selectedProjects.splice(i, 1);
    },
    now: function() {
      return new Date(Date.now()).toLocaleString();
    }
  },
  watch: {
    selectedProjects: function(val) {
      val.forEach(project => this.handleProjectLoad(project));
    }
  }
};
</script>


<style scoped>
#app {
  text-align: left;
}
</style>
