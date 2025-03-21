import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface DatabaseConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: Dialect;
    migrationStorageTableName: string;
    seederStorageTableName: string;
  };
}

const config: DatabaseConfig = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'eventing',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_migrations',
    seederStorageTableName: 'sequelize_seeds'
  },
  test: {
    username: process.env.TEST_DB_USER || 'postgres',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'eventing_test',
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT || '5432', 10),
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_migrations',
    seederStorageTableName: 'sequelize_seeds'
  },
  production: {
    username: process.env.PROD_DB_USER || 'postgres',
    password: process.env.PROD_DB_PASSWORD || '',
    database: process.env.PROD_DB_NAME || 'eventing_prod',
    host: process.env.PROD_DB_HOST || 'localhost',
    port: parseInt(process.env.PROD_DB_PORT || '5432', 10),
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_migrations',
    seederStorageTableName: 'sequelize_seeds'
  }
};

export = config;

