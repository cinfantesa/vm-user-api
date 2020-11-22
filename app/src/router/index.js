import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      if (Vue.prototype.$sessionService.token) next({ name: 'Home' })
      else next()
    },
    component: () => import('@/views/login/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/Register')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Home')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && to.name !== 'Register' && !Vue.prototype.$sessionService.token) next({ name: 'Login' })
  else next()
})

export default router
