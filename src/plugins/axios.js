import axios from 'axios';
import VueCookies from "vue-cookies";

const AxiosPlugin = {};

AxiosPlugin.install = function (Vue) {
  Vue.prototype.$axios = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + VueCookies.get("token"),
    },
    refreshToken: VueCookies.get("token"),
    responseType: "json",
    timeout: 3000,
  });

  // リクエストログ
  Vue.prototype.$axios.interceptors.request.use(
    function (config) {
      // console.info(config);
      return config;
    },
    function (error) {
      console.error(error);
      return Promise.reject(error);
    }
  );

  // レスポンスログ
  Vue.prototype.$axios.interceptors.response.use(
    function (response) {
      // console.info(response);
      console.log('レスポンス:', response.data)
      return response;
    },
    function (error) {
      console.error(error);
      return Promise.reject(error);
    }
  );
};

export default AxiosPlugin;
