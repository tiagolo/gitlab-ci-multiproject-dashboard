const state = {
  gitlab_url: 'https://gitlab.com',
  gitlab_token: '',
};

const getters = {
  gitlab_url: state => state.gitlab_url,
  gitlab_token: state => state.gitlab_token,
};

const mutations = {
  setGitlabUrl(state, url) {
    state.gitlab_url = url;
  },
};


export default {
  state,
  getters,
  mutations,
};
