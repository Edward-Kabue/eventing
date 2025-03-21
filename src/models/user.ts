import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from '../types';

class UserModel extends Model<User> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare role?: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  sequelize,
  tableName: 'users',
  underscored: true
});

export default UserModel;

