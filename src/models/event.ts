import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { Event, EventStatus } from "../types";
import UserModel from "./user";

class EventModel extends Model<Event> implements Event {
  public id!: number;
  public title!: string;
  public description!: string;
  public date!: Date;
  public location!: string;
  public capacity!: number;
  public price!: number;
  public creatorId!: number;
  public status!: EventStatus;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EventModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM(...Object.values(EventStatus)),
      allowNull: false,
      defaultValue: EventStatus.DRAFT,
    },
    createdAt: "",
    updatedAt: ""
  },
  {
    sequelize,
    tableName: "events",
    underscored: true,
  }
);

EventModel.belongsTo(UserModel, { foreignKey: "creatorId", as: "creator" });
UserModel.hasMany(EventModel, { foreignKey: "creatorId", as: "events" });

export default EventModel;