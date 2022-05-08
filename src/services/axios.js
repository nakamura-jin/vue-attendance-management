import axios from 'axios';
import VueCookies from "vue-cookies";

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common["Authorization"] = "Bearer " + VueCookies.get("token");