import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';

@ObjectType()
export class ReturnUserData extends OmitType(UserEntity, [
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
