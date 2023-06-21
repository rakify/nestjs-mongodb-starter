import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import GlobalSeeder from '.';
import { DB_CONNECTION } from 'core/environments';
import { User, UserSchema } from 'modules/user/user.schema';

seeder({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
}).run([GlobalSeeder]);
