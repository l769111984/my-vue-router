import Vue from 'vue'
import Router from './../myRouter'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/view/home'
import Detail from '@/view/detail'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
export default router
