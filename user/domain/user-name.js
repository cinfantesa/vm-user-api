class UserName {
  constructor({ firstName, surnames }) {
    this.firstName = firstName;
    this._surnames = surnames;
  }
}

module.exports = UserName;