import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { DatabaseConfig } from '../types';

dotenv.config();

const config: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'eventing'
};

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  logging: false
});

export default sequelize;