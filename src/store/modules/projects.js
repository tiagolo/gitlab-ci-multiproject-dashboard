import Vue from 'vue';
import _ from 'lodash';

const state = {
  isFetching: false,
  selectedProjects: [],
  availableProjects: [],
  _gitlab_query_params: {
    search: '',
    order_by: 'path',
    sort: 'asc',
    membership: true,
    per_page: 300,
  },
};

const getters = {
  gitlab_project_query(state) {
    return Object.keys(state._gitlab_query_params).reduce((previousValue, currentValue) => {
      if (!previousValue.match('=')) {
        previousValue = `${previousValue}=${state._gitlab_query_params[previousValue]}`;
      }
      return `${previousValue}&${currentValue}=${state._gitlab_query_params[currentValue]}`;
    });
  },
  getAvailableProjects: state => state.availableProjects,
  getSelectedProjects: state => state.selectedProjects,
};

const mutations = {
  setSelectedProjects(state, val) {
    val.forEach((project) => {
      if (!state.selectedProjects.find(p => p.id === project.id)) {
        if (!project.pipelines) project.pipelines = {};
        state.selectedProjects.push(project);
      }
    });
  },
  clearSelectedProjects(state) {
    state.selectedProjects = [];
  },
  removeProject(state, val) {
    const index = state.selectedProjects.findIndex(project => project.id === val.id);
    if (index || index === 0) {
      state.selectedProjects.splice(index, 1);
    }
  },
  setAvailableProjects(state, projects) {
    state.availableProjects = _.sortBy(projects, 'path_with_namespace');
  },
  setProjectPipeline(state, payload) {
    const index = state.selectedProjects.findIndex(project => project.id === payload.project.id);
    Vue.set(state.selectedProjects[index].pipelines, payload.prop, payload.json);
  },
};

const actions = {
  selectProjectsById({ state, commit }, val) {
    const selecteItems = val.map(id => state.availableProjects.find(item => item.id === id));
    commit('setSelectedProjects', JSON.parse(JSON.stringify(selecteItems)));
  },
  fetchAvailableProjects({ state, rootGetters, commit }) {
    // console.log('fetching available projects ..... ');
    return fetch(`${rootGetters.gitlabUrl}/api/v4/projects?${getters.gitlab_project_query(state)}&private_token=${rootGetters.gitlabToken}`)
      .then(response => response.json())
      .then((json) => {
        commit('setAvailableProjects', json);
      });
  },
  handleClearSelectedProjects({commit}) {
    commit('clearSelectedProjects')
  },
  handleProjectLoad({ rootGetters, commit }, project) {
    const fetchBranches = fetch(`${rootGetters.gitlabUrl}/api/v4/projects/`
      + `${project.id}/pipelines?scope=branches&per_page=3&private_token=${rootGetters.gitlabToken}`)
      .then(response => response.json())
      .then((json) => {
        if (json.length) {
          commit('setProjectPipeline', { project, json, prop: 'branches' });
        }
      });

    const fetchTags = fetch(`${rootGetters.gitlabUrl}/api/v4/projects/`
      + `${project.id}/pipelines?scope=tags&per_page=3&private_token=${rootGetters.gitlabToken}`)
      .then(response => response.json())
      .then((json) => {
        if (json.length) {
          commit('setProjectPipeline', { project, json, prop: 'tags' });
        }
      });

    const fetchVariables = fetch(`${rootGetters.gitlabUrl}/api/v4/projects/`
      + `${project.id}/variables?private_token=${rootGetters.gitlabToken}`)
      .then(response => response.json())
      .then((json) => {
        if (json.length) {
          // commit('setProjectPipeline', { project, json, prop: 'variables' });
        }
      });

    return Promise.all([fetchBranches, fetchTags, fetchVariables]);
  },
  handleRemoveProject({ commit }, project) {
    commit('removeProject', project);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
