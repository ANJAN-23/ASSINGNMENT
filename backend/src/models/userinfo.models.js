const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const GithubUser = sequelize.define("GithubUser", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: true
  },

  followers: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  following: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  public_repos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  avatar_url: {
    type: DataTypes.TEXT
  },

  bio: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

module.exports = GithubUser;