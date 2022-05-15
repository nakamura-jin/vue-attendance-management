import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

class AuthService {
  constructor() {
    this.auth = axios.create()
  }

  login(request) {
    const interceptor = this.auth.interceptors.response.use(response => {
      sessionStorage.setItem('token', response.data.refresh_token)
      sessionStorage.setItem('user', JSON.stringify(response.data.user))
    })
    const url = "/login";
    return this.auth.post(url, request).finally(() => {
      this.auth.interceptors.response.eject(interceptor);
    });
  }
}

export default new AuthService()