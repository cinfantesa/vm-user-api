import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) next({ name: 'Home' })
      else next()
    },
    component: () => import('@/pages/login/Login')
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

router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && !localStorage.getItem('token')) next({ name: 'Login' })
  else next()
})

export default router
