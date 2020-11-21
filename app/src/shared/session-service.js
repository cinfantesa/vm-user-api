import jwtDecode from 'jwt-decode';
import User from '@/shared/user';

const TOKEN = 'token'

export default class SessionService {
  _loggedUser


  loginUser(token) {
    console.log('token', token)
    const decodedToken = jwtDecode(token)
    console.log('decoded', decodedToken)
    this._loggedUser = new User(decodedToken)
    console.log('user', this._loggedUser)
    localStorage.setItem(TOKEN, token)
  }

  remove() {
    localStorage.removeItem(TOKEN)
    this._loggedUser = null
  }

  get user() {
    console.log('getting user', this._loggedUser)
    console.log('token in localStorage', localStorage.getItem(TOKEN))
    return this._loggedUser
  }

  get token() {
    return localStorage.getItem(TOKEN)
  }
}