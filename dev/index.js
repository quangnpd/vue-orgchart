// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { OrgChart } from '../src'

Vue.config.productionTip = false

const orgChartData = [
  {
    id: '1',
    text: 'Chairman & CEO',
    title: 'Henry Bennett',
    img: '../common/img/avatar-1.png'
  },
  {
    id: '2',
    text: 'Manager',
    title: 'Mildred Kim',
    img: '../common/img/avatar-2.png',
    parent: '1'
  },
  {
    id: '3',
    text: 'Technical Director',
    title: 'Jerry Wagner',
    img: '../common/img/avatar-3.png',
    type: 'img-card',
    parent: '1'
  },
  {
    id: '2.1',
    text: 'Marketer',
    title: 'Charles Little',
    img: '../common/img/avatar-4.png',
    parent: '2'
  },
  {
    id: '2.2',
    text: 'Marketer',
    title: 'Charles Little',
    img: '../common/img/avatar-4.png',
    parent: '2',
    html: '<strong>Test</strong><div>Test span: <span class="a"><i data-est="test" class="fa fa-foverer"></i>span</span></div>',
    type: 'img-card'
  }
]

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { OrgChart },
  data: function() {
    return {
      tree: []
    }
  },
  mounted: function() {
    this.getAsyncData().then(resp => {
      if (resp) {
        this.tree = resp
      }
    })
  },
  methods: {
    getAsyncData() {
      return new Promise(resolve => {
        setTimeout(() => resolve(orgChartData), 1000)
      })
    },
    addItem() {
      let newItem = {
        id: '3.1',
        text: 'Team Lead ',
        title: 'Jonathan Lane',
        img: '../common/img/avatar-5.png',
        parent: '3'
      }
      if (this.$refs.orgchart.isExists(newItem.id)) {
      } else {
        this.tree.push(newItem)
      }
      console.log(this.tree)
    }
  }
})
