import Vue from 'vue'
import Router from 'vue-router'
import AddPlace from '@/components/AddPlace'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AddPlace',
      component: AddPlace
    },
    {
      path: '/AddPlace',
      name: 'AddPlace',
      component: AddPlace
    }
    
  ]
})
