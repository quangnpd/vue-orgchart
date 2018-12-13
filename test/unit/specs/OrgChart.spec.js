import Vue from 'vue'
import OrgChart from '@/components/OrgChart'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(OrgChart)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome to Your Vue.js App')
  })
})
