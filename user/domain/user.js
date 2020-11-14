const UserInfo = require('./user-info');
const UserName = require('./user-name');

class User {
  constructor({ id, name = {}, info = {}, password }) {
    this.id = id;
    this.name = name;
    this.info = info;
    this.password = password;
  }

  set id(id) {
    if (!id) {
      throw new Error('Id required');
    }
    this._id = id;
  }
  set password(password) {
    if (!password) {
      throw new Error('Password required');
    }
    if(password.length < 7) {
      throw new Error('Password length must be greater than 7 characters');
    }
    this._password = password;
  }

  set info(userInfo) {
    this._info = new UserInfo(userInfo);
  }

  set name(userName) {
    this._name= new UserName(userName);
  }
}

module.exports = User;