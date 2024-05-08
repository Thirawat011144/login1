const conn = require("../connect");
const { DataTypes } = require("sequelize");

const UsersModel = conn.define("users", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(255),
  },
});
// UsersModel.sync({ alter: true })
//   .then(() => {
//     console.log("Table created successfully!");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = UsersModel;
