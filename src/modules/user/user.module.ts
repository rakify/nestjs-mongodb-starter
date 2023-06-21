import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthService } from 'modules/auth/auth.service';
import { DatabaseModule } from 'modules/database/database.module';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UserResolver, UserService, AuthService, ...userProviders],
  exports: [],
})
export class UserModule {}
