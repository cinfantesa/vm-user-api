const { toDomain, toDocument } = require('./user-parser');

class MongoUserRepository {
  constructor({ db }) {
    this._db = db;
  }

  async save(user) {
    const conn = await this._db.connect();
    const document = toDocument(user);
    await conn.collection('users').replaceOne({_id: document._id }, document, { upsert: true });

    this._db.disconnect();
  }

  async findByEmail(email) {
    const conn = await this._db.connect();
    const document = await conn.collection('users').findOne({ email });

    this._db.disconnect();

    return document ? toDomain(document) : null;
  }

  async delete(id) {
    const conn = await this._db.connect();
    await conn.collection('users').deleteOne({ _id: id });

    this._db.disconnect();
  }
}

module.exports = MongoUserRepository;