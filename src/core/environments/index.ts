import * as dotenv from 'dotenv';
dotenv.config();

const DB_TYPE = process.env.DB_TYPE;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = +process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const MODE = process.env.MODE;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL;

export {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
  DB_USERNAME,
  DB_DATABASE,
  MODE,
  PORT,
  JWT_SECRET,
  DEFAULT_ADMIN_EMAIL,
};
