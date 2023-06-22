import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthService } from 'modules/auth/auth.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

const userProviders = [AuthService, UserResolver, UserService];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [...userProviders],
})
export class UserModule {}
