class LoginUser {
  constructor({ authenticationService }) {
    this._authenticationService = authenticationService;
  }

  async login ({ email, password }) {
    return await this._authenticationService.authenticate({ email, password });
  }
}


module.exports = LoginUser;