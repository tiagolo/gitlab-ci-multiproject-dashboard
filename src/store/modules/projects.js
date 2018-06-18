const state = {
  selectedProjects: [],
  availableProjects: [],
  _gitlab_query_params: {
    search: '',
    order_by: 'path',
    membership: true,
  },
};

const getters = {
  gitlab_project_query(state) {
    return Object.keys(state._gitlab_query_params).reduce((previousValue, currentValue) => {
      if (!previousValue.match('=')) {
        previousValue = `${previousValue}=${state._gitlab_query_params[ previousValue ]}`;
      }
      return `${previousValue}&${currentValue}=${state._gitlab_query_params[ currentValue ]}`;
    });
  },
  getAvailableProjects: state => state.availableProjects,
};

const mutations = {
  addSelectedProject(state, val) {
    if (!state.selectProjects.find(project => project.id === val.id)) {
      state.selectProjects.push(val);
    }
  },
  setAvailableProjects(state, projects) {
    state.availableProjects = projects;
    if (!state.selectedProjects.length) {
      state.selectedProjects = projects;
    }
  },
};

const actions = {
  fetchAvailableProjects({ rootGetters, commit }) {
    console.log('fetching available projects ..... ');
    fetch(`${rootGetters.gitlabUrl}/api/v4/projects?${getters.gitlab_project_query(state)}&private_token=${rootGetters.gitlabToken}`)
      .then(response => response.json())
      .then((json) => {
        commit('setAvailableProjects', json);
      });
  },
  // handleProjectLoad(project) {
  //   fetch(
  //     `${this.gitlabUrl}/api/v4/projects/${project.id}/pipelines?scope=branches&per_page=5&private_token=${this.gitlabToken}`,
  //   )
  //     .then(response => response.json())
  //     .then((json) => {
  //       if (json.length) {
  //         if (!project.pipelines) this.$set(project, 'pipelines', {});
  //         this.$set(project.pipelines, 'branches', json);
  //       }
  //     });
  //
  //   fetch(
  //     `${this.gitlabUrl}/api/v4/projects/${project.id}/pipelines?scope=tags&per_page=5&private_token=${this.gitlabToken}`,
  //   )
  //     .then(response => response.json())
  //     .then((json) => {
  //       if (json.length) {
  //         if (!project.pipelines) this.$set(project, 'pipelines', {});
  //         this.$set(project.pipelines, 'tags', json);
  //       }
  //     });
  //
  //   fetch(
  //     `${this.gitlabUrl}/api/v4/projects/${project.id}/variables?private_token=${this.gitlabToken}`,
  //   )
  //     .then(response => response.json())
  //     .then((json) => {
  //       if (json.length) {
  //         if (!project.pipelines) this.$set(project, 'pipelines', {});
  //         this.$set(
  //           project.pipelines,
  //           'variables',
  //           json, // .filter(item => item.key.startsWith("NEXUS"))
  //         );
  //       }
  //     });
  // },
  // handleSelectProject() {
  //   this.selectedProjects.push(this.currentProject);
  // },
  // handleRemoveProject(commit, project) {
  //   const i = this.selectedProjects.indexOf(project);
  //   if (i >= 0) this.selectedProjects.splice(i, 1);
  // },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
