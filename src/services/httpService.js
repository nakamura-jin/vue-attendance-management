import axios from "axios";
// import dayjs from "dayjs";
import auth from '@/services/auth'
import get from 'lodash/get';
import store from "@/store/index";


class HttpService {
  constructor() {
    this.http = axios.create();
    this.init();
  }

  init() {
    this.http.interceptors.request.use((config) => {
      // console.log('リクエスト: ', config)
      const access_token = get(auth.value, 'access_token', '')
      config.headers["Authorization"] = "Bearer " + access_token;
      return config;
    });

    this.http.interceptors.response.use((response) => {
      // console.log('レスポンスデータ: ', response);
      return response;
    },
      (error) => {
        // console.log('error: ', error)
        if (error.response.data.message === "Unauthenticated.") {
          auth.refresh()
        }
        return Promise.reject(error);
      }
    );
  }

  async get(uri, params) {
    await auth.isAuthenticated();
    if (store.state.loading === true) {
      store.commit("FINISH_LOADING");
    }
    return this.http.get(`${uri}`, { params: params });
  }

  async post(uri, params) {
    await auth.isAuthenticated();
    return this.http.post(`${uri}`, params)
  }

  put(uri, params) {
    return this.http.put(`${uri}`, params)
  }

  delete(uri, params) {
    return this.http.delete(`${uri}`, params)
  }
}

export default new HttpService();
