import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/login/Login';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/register/Register')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home/Home')
  }
]

const router = new VueRouter({
  routes
})

export default router
