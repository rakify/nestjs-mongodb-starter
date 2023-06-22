import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from '../user.schema';

@ObjectType()
export class ReturnUserData extends OmitType(User, [
  'password',
  'isActive',
] as const) {}

@ObjectType()
export class LoginResponseDTO {
  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  access_token: string;

  @Field(() => ReturnUserData, { nullable: true })
  userData: ReturnUserData;
}
