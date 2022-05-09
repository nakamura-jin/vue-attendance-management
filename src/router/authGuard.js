import $cookies from 'vue-cookies'

const authGuard = async (to, from, next) => {
  if ($cookies.get('token')) {
    next()
  } else {
    next('/login')
  }
}

export { authGuard }