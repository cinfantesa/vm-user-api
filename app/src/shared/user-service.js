import axios from 'axios'
import jwtDecode from 'jwt-decode';
import User from '@/shared/user';
import ObjectID from "bson-objectid";

export default class UserService {
  loggedUser

  static async login({ email, password }) {
    const url = `${process.env.VUE_APP_API_URL}/login`
    const response = await axios.post(url, { email, password })

    const { token } = response.data
    const decodedToken = await jwtDecode(token)
    this.loggedUser = new User(decodedToken)
    localStorage.setItem('token', token)
    return token
  }

  static async register(user) {
    await axios.post(`${process.env.VUE_APP_API_URL}/users`, {
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

  static async update({ user, newPassword }) {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    await axios.put(`${process.env.VUE_APP_API_URL}/users/${user.id}`, {
      email: user.email,
      password: user.password,
      newPassword,
      name: user.name,
      surnames: user.surnames,
      postalCode: user.postalCode,
      country: user.country,
      phone: user.phone
    }, config)
  }

  static async remove(user) {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    await axios.delete(`${process.env.VUE_APP_API_URL}/users/${user.id}`, config)
    this.loggedUser = null
    localStorage.removeItem('token')
  }
}