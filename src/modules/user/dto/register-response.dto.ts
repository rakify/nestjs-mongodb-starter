import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';

@ObjectType()
export class RegisteredUserData extends OmitType(UserEntity, [
  'password',
  'isActive',
] as const) {}

@ObjectType()
export class RegisterResponseDTO {
  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  access_token: string;

  @Field(() => RegisteredUserData, { nullable: true })
  userData: RegisteredUserData;
}
