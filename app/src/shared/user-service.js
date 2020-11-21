import axios from 'axios'
import ObjectID from 'bson-objectid';

export default class UserService {
  constructor({ sessionService }) {
    this._sessionService = sessionService
  }

  async login({ email, password }) {
    const url = `${process.env.VUE_APP_API_URL}/login`
    const response = await axios.post(url, { email, password })

    const { token } = response.data
    this._sessionService.loginUser(token)
  }

  async register(user) {
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

  async update({ user, newPassword }) {
    const config = {
      headers: { Authorization: `Bearer ${this._sessionService.token}` }
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

  async remove(user) {
    const config = {
      headers: { Authorization: `Bearer ${this._sessionService.token}` }
    };
    await axios.delete(`${process.env.VUE_APP_API_URL}/users/${user.id}`, config)
    this._sessionService.remove()
  }
}