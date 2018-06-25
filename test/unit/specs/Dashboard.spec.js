import Vue from 'vue';
import Dashboard from '@/components/Dashboard.vue';

describe('Dashboard', () => {
  it('has a created hook', () => {
    console.log(typeof Dashboard.created);
    expect(typeof Dashboard.created).to.equal('function');
  });

  // it('should render correct contents', () => {
  //   const Constructor = Vue.extend(Dashboard);
  //   const vm = new Constructor().$mount();
  //   expect(vm.$el.querySelector('.content h3').textContent)
  //     .to.equal('Select Projects');
  // });
});
