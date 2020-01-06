import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddPlace from '@/components/AddPlace'
import AddPerson from '@/components/AddPerson'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/AddPlace',
      name: 'AddPlace',
      component: AddPlace
    },
    {
      path: '/AddPerson',
      name: 'AddPerson',
      component: AddPerson
    }
  ]
})
