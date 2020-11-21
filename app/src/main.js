import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import SessionService from '@/shared/session-service';
import UserService from '@/shared/user-service';

Vue.config.productionTip = false

const sessionService = new SessionService()
const userService = new UserService({ sessionService })
Vue.prototype.$sessionService = sessionService
Vue.prototype.$userService = userService

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
