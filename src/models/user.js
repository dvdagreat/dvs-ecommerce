import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
class User extends Model { }

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    username: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    last_name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email_address: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  },
);

export default User;