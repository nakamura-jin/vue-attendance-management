// import $cookies from 'vue-cookies'

const authGuard = async (to, from, next) => {
  if (sessionStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
}

const admin = async (to, from, next) => {
  if (
    JSON.parse(sessionStorage.getItem("user")).role === 1 &&
    sessionStorage.getItem("token")
  ) {
    next();
  } else {
    next(from.path);
  }
}
export { authGuard, admin }