import jwtDecode from 'jwt-decode';
import User from '@/shared/user';

const TOKEN = 'token'

export default class SessionService {
  _loggedUser


  loginUser(token) {
    const decodedToken = jwtDecode(token)
    this._loggedUser = new User(decodedToken)
    sessionStorage.setItem(TOKEN, token)
  }

  remove() {
    sessionStorage.removeItem(TOKEN)
    this._loggedUser = null
  }

  get user() {
    return this._loggedUser
  }

  get token() {
    return sessionStorage.getItem(TOKEN)
  }
}