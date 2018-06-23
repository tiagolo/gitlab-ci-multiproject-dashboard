const state = {
  isFetching: false,
  selectedProjects: [],
  availableProjects: [],
  _gitlab_query_params: {
    search: '',
    order_by: 'path',
    membership: true,
    per_page: 100,
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
  getSelectedProjects: state => state.selectedProjects,
};

const mutations = {
  setSelectedProjects(state, val) {
    val.forEach((project) => {
      if (!project.pipelines) project.pipelines = {};
    });
    state.selectedProjects = val;
  },
  clearSelectedProjects(state) {
    state.selectedProjects = [];
  },
  addSelectedProjects(state, val) {
    if (!state.selectedProjects.find(project => project.id === val.id)) {
      state.selectedProjects.push(val);
    }
  },
  setAvailableProjects(state, projects) {
    state.availableProjects = projects;
  },
  setProjectPipeline(state, payload) {
    const index = state.selectedProjects.findIndex(project => project.id === payload.project.id);
    state.selectedProjects[ index ].pipelines[ payload.prop ] = payload.json;
  },
};

const actions = {
  selectProjectsById({ state, commit }, val) {
    const selecteItems = val.map(id => state.availableProjects.find(item => item.id === id));
    commit('setSelectedProjects', JSON.parse(JSON.stringify(selecteItems)));
  },
  fetchAvailableProjects({ state, rootGetters, commit }) {
    console.log('fetching available projects ..... ');
    fetch(`${rootGetters.gitlabUrl}/api/v4/projects?${getters.gitlab_project_query(state)}&private_token=${rootGetters.gitlabToken}`)
      .then(response => response.json())
      .then((json) => {
        commit('setAvailableProjects', json);
      });
  },
  handleProjectLoad({ rootGetters, commit }, project) {
    fetch(`${rootGetters.gitlabUrl}/api/v4/projects/${project.id}/pipelines?scope=branches&per_page=5&private_token=${rootGetters.gitlabToken}`)
      .then(response => response.json())
      .then((json) => {
        if (json.length) {
          commit('setProjectPipeline', { project, json, prop: 'branches' });
        }
      });
    fetch(`${rootGetters.gitlabUrl}/api/v4/projects/${project.id}/pipelines?scope=tags&per_page=5&private_token=${rootGetters.gitlabToken}`,)
      .then(response => response.json())
      .then((json) => {
        if (json.length) {
          commit('setProjectPipeline', { project, json, prop: 'tags' });
        }
      });
    fetch(`${rootGetters.gitlabUrl}/api/v4/projects/${project.id}/variables?private_token=${rootGetters.gitlabToken}`,)
      .then(response => response.json())
      .then((json) => {
        if (json.length) {
          // commit('setProjectPipeline', { project, json, prop: 'variables' });
        }
      });
  },
  //
  //
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
