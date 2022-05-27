import axios from 'axios'
import get from 'lodash/get'
import dayjs from 'dayjs'
import { rejectService } from '@/router/authGuard'
import store from '@/store/index'

// axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.baseURL = "https://my-attendance-app.herokuapp.com/api"

class AuthService {
  constructor() {
    this.STORAGE = sessionStorage;
    this.auth = axios.create();
  }

  get value() {
    return JSON.parse(this.STORAGE.getItem("data"));
  }

  get token_expiration() {
    const auth = this.value;
    const period = get(auth, "expires_in", 0);
    // console.log(period, dayjs().unix());
    // console.log("有効期限: ", dayjs().format("YYYY-MM-DD HH:mm"));
    return period > dayjs().unix();
  }

  // isAuthenticated() {
  //   return new Promise((resolve) => {
  //     if (this.value && this.token_expiration) {
  //       resolve(true);
  //       return;
  //     }

  //     if (!this.value) {
  //       rejectService(true);
  //       return;
  //     }
  //     this.refresh()
  //     // if (refresh) resolve(true);
  //     // else rejectService(true);
  //   });
  // }
  isAuthenticated() {
    return new Promise((resolve) => {
      if (this.value && this.token_expiration) {
        return resolve('promise');
      }

      if (!this.value) {
        rejectService(true);
      }

      store.commit("START_LOADING");
      this.refresh()
      setTimeout(() => {
        resolve(true)
      }, 200)

    })
  }

  login(request) {
    const interceptor = this.auth.interceptors.response.use(
      async (response) => {
        if (response.data) {
          this.success(response.data);
        }
      },
      (error) => error.response
    );

    const url = "/login";
    return this.auth.post(url, request).finally(() => {
      this.auth.interceptors.response.eject(interceptor);
    });
  }

  refresh() {
    this.auth.interceptors.request.use((config) => {
      const access_token = get(this.value, "access_token", "");
      config.headers["Authorization"] = "Bearer " + access_token;
      return config;
    });

    // const interceptor = this.auth.interceptors.response.use()
    const interceptor = this.auth.interceptors.response.use(
      (response) => {
        // console.log(response.data);
        this.setToken(response.data);
        return response;
      },
      (error) => {
        // console.log("reponse: ", error);
        rejectService(true);
        return Promise.reject(error);
      }
    );
    const url = "/refresh";
    this.auth.post(url).finally(() => {
      this.auth.interceptors.response.eject(interceptor);
    });
  }

  async setToken(data) {
    const storage = JSON.parse(this.STORAGE.getItem("data"));
    storage.access_token = data.access_token;
    storage.expires_in = data.expires_in;
    storage.user = data.user;
    await this.success(storage);

    // console.log(
    //   "トークン新有効期限： ",
    //   dayjs(data.token_period).format("YYYY-MM-DD HH:mm")
    // );
    // console.log("再発行されたトークン： ", data.access_token);
  }

  logout() {
    sessionStorage.removeItem("data");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("worker_id");
  }

  async success(authData) {
    this.STORAGE.setItem("data", JSON.stringify(authData));
  }
}

export default new AuthService()