const state = {
  _gitlabUrl: 'https://gitlab.com',
  _gitlabToken: '',
};

const getters = {
  gitlabUrl: state => state._gitlabUrl,
  gitlabToken: state => state._gitlabToken,
};

const mutations = {
  setGitlabUrl(state, url) {
    state._gitlabUrl = url;
  },
  setGitlabToken(state, token) {
    state._gitlabToken = token;
  },
};


export default {
  state,
  getters,
  mutations,
};
