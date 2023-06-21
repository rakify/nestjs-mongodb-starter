import { TypeOrmModule } from '@nestjs/typeorm';
import GlobalSeeder from '.';
import { MysqlDataSource } from 'core/config/database.config';
import { UserEntity } from 'modules/user/user.entity';
import { seeder } from 'nestjs-seeder';

seeder({
  imports: [
    TypeOrmModule.forRoot(MysqlDataSource),
    TypeOrmModule.forFeature([UserEntity]),
  ],
}).run([GlobalSeeder]);
