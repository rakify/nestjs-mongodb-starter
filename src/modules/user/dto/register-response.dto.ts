import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from '../user.schema';

@ObjectType()
export class RegisteredUserData extends OmitType(User, [
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
