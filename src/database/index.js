const Sequelize = require('sequelize');
const Users = require('../apps/models/Users');
const Posts = require('../apps/models/Posts');
const Likes = require('../apps/models/Likes');

const models = { Users, Posts, Likes };
const databaseConfig = require('../configs/db');

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    Object.values(models).map((model) => model.init(this.connection));

    Object.values(models)
      .filter((model) => typeof model.associate === 'function')
      .forEach((model) => model.associate(models));
  }
}

module.exports = new Database();
