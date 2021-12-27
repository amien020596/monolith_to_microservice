const dev = {
  BASE_URL: 'http://localhost:8014/api',
  USERS_URL: 'http://localhost:8016/api',
  CHECKOUT_URL: 'http://localhost:3002'
}
const prod = {
  BASE_URL: '',
  USERS_URL: '',
  CHECKOUT_URL: ''
}
export default {
  ...(process.env.NODE_ENV === 'development' ? dev : prod)
}