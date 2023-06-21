import { UserEntitySchema } from 'modules/user/user.entity';
import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import GlobalSeeder from '.';
import { DB_CONNECTION } from 'core/environments';

seeder({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    MongooseModule.forFeature([
      { name: 'UserEntity', schema: UserEntitySchema },
    ]),
  ],
}).run([GlobalSeeder]);
