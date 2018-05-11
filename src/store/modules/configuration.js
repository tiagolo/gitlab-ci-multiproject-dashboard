const state = {
  gitlab_url: 'https://gitlab.com',
  gitlab_token: '',
};

const getters = {
  gitlab_url: state => state.gitlab_url,
  gitlab_token: state => state.gitlab_token,
};

const mutations = {
  set_gitlab_url(state, url) {
    state.gitlab_url = url;
  },
  set_gitlab_token(state, token) {
    state.gitlab_token = token;
  },
};


export default {
  state,
  getters,
  mutations,
};
