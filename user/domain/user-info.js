class UserInfo {
  constructor({ email, country, phone, postalCode}) {
    this.email = email;
    this._country = country;
    this._phone = phone;
    this._postalCode = postalCode;
  }
}

module.exports = UserInfo;