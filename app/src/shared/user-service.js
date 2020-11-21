import axios from 'axios'
import jwtDecode from 'jwt-decode';
import User from '@/shared/user';
import ObjectID from "bson-objectid";

const url = 'http://localhost:3000'
export default class UserService {
  loggedUser

  static async login({ email, password }) {
    const response = await axios.post(`${url}/login`, { email, password })

    const { token } = response.data
    const decodedToken = await jwtDecode(token)
    this.loggedUser = new User(decodedToken)
    localStorage.setItem('token', token)
    return token
  }

  static async register(user) {
    console.log('user', user)
    await axios.post(`${url}/users`, {
      id: ObjectID(),
      email: user.email,
      password: user.password,
      name: user.name,
      surnames: user.surnames,
      postalCode: user.postalCode,
      country: user.country,
      phone: user.phone
    })
  }
}