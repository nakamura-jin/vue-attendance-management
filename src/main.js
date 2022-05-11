import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// axios
import '@/services/axios'

//font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUser,
  faList,
  faCalendarDays,
  faPen,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faList, faCalendarDays, faPen, faXmark);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// cookie
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
