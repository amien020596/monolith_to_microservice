const dev = {
  BASE_URL: 'http://localhost:8014/api/influemcer',
  CHECKOUT_URL: 'http://localhost:3002'
}

const prod = {
  BASE_URL: '',
  CHECKOUT_URL: ''
}

export const constants = process.env.NODE_ENV === 'development' ? dev : prod;