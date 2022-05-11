// import $cookies from 'vue-cookies'

const authGuard = async (to, from, next) => {
  if (sessionStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
}

export { authGuard }