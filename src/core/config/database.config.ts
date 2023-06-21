import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '../environments/index';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const MysqlDataSource: MysqlConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['dist/modules/**/*.entity.js'],
  migrations: ['dist/core/migration/*.js'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
};
