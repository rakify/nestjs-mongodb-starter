import { DataSource } from 'typeorm';
import { MysqlDataSource } from './database.config';

export const dataSource = new DataSource(MysqlDataSource);

export const connectDataSource = async () => {
  try {
    await dataSource.initialize();
    console.log('Database has been initialized!');
  } catch (err) {
    console.error('Error during Database initialization', err);
  }
};
