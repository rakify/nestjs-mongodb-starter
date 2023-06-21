import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDataSource } from 'core/config/datasource.config';
import { PORT } from 'core/environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await Promise.all([app.listen(PORT || 4000), connectDataSource()]);
}
bootstrap();
