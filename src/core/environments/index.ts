import * as dotenv from 'dotenv';
dotenv.config();

const DB_CONNECTION = process.env.DB_CONNECTION;

const MODE = process.env.MODE;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL;

export { DB_CONNECTION, MODE, PORT, JWT_SECRET, DEFAULT_ADMIN_EMAIL };
