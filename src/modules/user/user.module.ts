import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntitySchema } from './user.entity';
import { AuthService } from 'modules/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserEntity', schema: UserEntitySchema },
    ]),
  ],
  providers: [UserResolver, UserService, AuthService],
  exports: [],
})
export class UserModule {}
