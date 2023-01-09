"use strict";
const config = require("config");
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  Users.generateToken = (id, username) => {
    const token = jwt.sign({ id, username }, config.get("jwtPrivateKey"), {
      expiresIn: "10m",
    });
    return token;
  };
  return Users;
};
