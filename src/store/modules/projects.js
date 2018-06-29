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
    per_page: 25,
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
  setSearch(state, search) {
    Vue.set(state._gitlab_query_params, 'search', search);
  },
  setSelectedProjects(state, val) {
    val.forEach((project) => {
      const currentProject = state.selectedProjects.find(p => p.id === project.id);
      if (currentProject) project.pipelines = currentProject.pipelines;
      else if (!project.pipelines) project.pipelines = {};
    });
    state.selectedProjects = val;
  },
  clearSelectedProjects(state) {
    state.selectedProjects = [];
    state._gitlab_query_params.per_page = 25;
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
    Vue.set(state.selectedProjects[ index ].pipelines, payload.prop, payload.json);
  },
};

const actions = {
  selectProjectsById({ state, commit }, val) {
    const selecteItems = val.map(id => state.availableProjects.find(item => item.id === id));
    commit('setSelectedProjects', JSON.parse(JSON.stringify(selecteItems)));
  },
  fetchAvailableProjects({ state, rootGetters, commit }, search) {
    if (!search || search.length >= 3) {
      commit('setSearch', search);
      let url = `${rootGetters.gitlabUrl}/api/v4/projects?${getters.gitlab_project_query(state)}&private_token=${rootGetters.gitlabToken}`;
      console.log(url);
      return fetch(url)
        .then(response => response.json())
        .then((json) => {
          if (json && json instanceof Array && json.length) {
            commit('setAvailableProjects', json);
          }
        });
    };
  },
  handleClearSelectedProjects({ commit }) {
    commit('clearSelectedProjects');
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

    const fetchEnvironments = fetch(`${rootGetters.gitlabUrl}/api/v4/projects/`
      + `${project.id}/environments?private_token=${rootGetters.gitlabToken}`)
      .then(response => response.json())
      .then((json) => {
        if (json.length) {
          // commit('setProjectPipeline', { project, json, prop: 'environments' });
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

    return Promise.all([ fetchBranches, fetchTags, fetchEnvironments, fetchVariables ]);
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
