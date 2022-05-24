// import $cookies from 'vue-cookies'
import auth from '@/services/auth'

const authGuard = async (to, from, next) => {
  const storage = JSON.parse(sessionStorage.getItem("data"))

  if (!storage) {
    next('/login')
  } else {
    next()
  }
}

const admin = async (to, from, next) => {
  const storage = JSON.parse(sessionStorage.getItem("data"));
  console.log('guard: ', auth.token_expiration)
  if (
    storage.user.role === 1 &&
    storage.access_token
  ) {
    next();
  } else {
    next(from.path);
  }
}

const rejectService = async (dialog) => {
  if (dialog) {
    location.href = '/login'
  }
}
export { authGuard, admin, rejectService }