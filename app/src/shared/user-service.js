import axios from 'axios'

export default class UserService {
  constructor() {
    this.url = 'http://localhost:3000'
  }
  async login({ email, password }) {
    const response = await axios.post('http://localhost:3000/login', { email, password })

    const { token } = response.data
    localStorage.setItem('token', token)
    return token
  }

  async register() {

  }
}