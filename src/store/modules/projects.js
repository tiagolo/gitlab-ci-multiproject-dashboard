const state = {
  _selectedProjects: [],
};

const getters = {
  selectedProjects: state => state._selectedProjects,
  projects(state) {
    return null;
  },
};

const mutations = {
  // addSelectedProject(state, val) {
  //   if (!state.selectProjects.find(project => project.id === val.id)) {
  //     state.selectProjects.push(val);
  //   }
  // },
};

const actions = {
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
  handleRemoveProject(commit, project) {
    const i = this.selectedProjects.indexOf(project);
    if (i >= 0) this.selectedProjects.splice(i, 1);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
