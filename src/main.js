import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// auth
import '@/services/auth'

//vae-validate
import '@/plugins/vee-validate'

//font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUser,
  faList,
  faCalendarDays,
  faPen,
  faXmark,
  faAddressBook,
  faAddressCard,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUser,
  faList,
  faCalendarDays,
  faPen,
  faXmark,
  faAddressBook,
  faAddressCard,
  faTrashCan
);
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
