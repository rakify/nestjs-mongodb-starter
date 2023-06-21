import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AppResolver } from 'app.resolver';
import { GraphQLConfig } from 'core/config/graphql.config';
import { AuthModule } from 'modules/auth/auth.module';
import { DB_CONNECTION } from 'core/environments';

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    GraphQLModule.forRoot(GraphQLConfig),
    UserModule,
    AuthModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
