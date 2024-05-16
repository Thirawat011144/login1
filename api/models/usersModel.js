const conn = require("../connect");
const { DataTypes } = require("sequelize");

const UsersModel = conn.define("users", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  surename: {
    type: DataTypes.STRING(50)
  },
  userName: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(255),
  },
  company: {
    type: DataTypes.STRING(100),
  },
  year: {
    type: DataTypes.STRING(48),
  },
  branch: {
    type: DataTypes.STRING(48)
  },
  phoneNumber: {
    type:DataTypes.BIGINT
  },
  role: {
    type: DataTypes.STRING(48),
    defaultValue: 'user'
  }
});
// UsersModel.sync({ alter: true })
//   .then(() => {
//     console.log("Table created successfully!");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = UsersModel;
