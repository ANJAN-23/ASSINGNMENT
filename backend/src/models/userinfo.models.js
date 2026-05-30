const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const GithubUser = sequelize.define(
  "GithubUser",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING
    },

    bio: {
      type: DataTypes.TEXT
    },

    avatar_url: {
      type: DataTypes.TEXT
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

    total_stars: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    total_forks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    most_used_language: {
      type: DataTypes.STRING
    },

    follower_ratio: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },

    popularity_score: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },

    account_age_days: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = GithubUser;