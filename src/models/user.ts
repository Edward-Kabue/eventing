import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from '../types';

class UserModel extends Model implements User {
  public id!: number;
  public name!: string;
  public email!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
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
  }
}, {
  sequelize,
  tableName: 'users'
});

export default UserModel;