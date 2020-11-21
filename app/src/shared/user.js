export default class User {
  constructor({ id, email, password, name, surnames, postalCode, country, phone }) {
    this._id = id
    this._email = email
    this._password = password
    this._name = name
    this._surnames = surnames
    this._postalCode = postalCode
    this._country = country
    this._phone = phone
  }

  set id(id) {
    this._id = id
  }

  get id() {
    return this._id
  }

  set email(email) {
    this._email = email
  }

  get email() {
    return this._email
  }

  set password(password) {
    this._password = password
  }

  get password() {
    return this._password
  }

  set name(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  set surnames(surnames) {
    this._surnames = surnames
  }

  get surnames() {
    return this._surnames
  }

  set postalCode(postalCode) {
    this._postalCode = postalCode
  }

  get postalCode() {
    return this._postalCode
  }

  set country(country) {
    this._country = country
  }

  get country() {
    return this._country
  }

  set phone(phone) {
    this._phone = phone
  }

  get phone() {
    return this._phone
  }
}