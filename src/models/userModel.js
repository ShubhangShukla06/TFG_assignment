const { sequelizeObj, Model, DataTypes } = require("../db/mysqlConnection");

class UserModel extends Model {}

UserModel.init(
  {
    email: {
      type: DataTypes.STRING(150),
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelizeObj,
    tableName: "user",
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "email" }],
      },
    ],
  }
);

module.exports = UserModel;
