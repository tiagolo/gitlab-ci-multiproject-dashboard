const state = {
  _gitlabUrl: 'https://gitlab.com',
  _gitlabToken: '',
  _viewType: false,
  _refreshDelay: 10,
};

const getters = {
  gitlabUrl: state => state._gitlabUrl,
  gitlabToken: state => state._gitlabToken,
  viewType: state => state._viewType,
  refreshDelay: state => state._refreshDelay,
};

const mutations = {
  setGitlabUrl(state, url) {
    state._gitlabUrl = url;
  },
  setGitlabToken(state, token) {
    state._gitlabToken = token;
  },
  setViewType(state, type) {
    state._viewType = type;
  },
  setRefreshDelay(state, delay) {
    state._refreshDelay = delay;
  }
};

export default {
  state,
  getters,
  mutations,
};
