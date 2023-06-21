import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from '../user.schema';

@ObjectType()
export class UpdatedUserData extends OmitType(User, [
  'password',
  'isActive',
] as const) {}

@ObjectType()
export class UpdateUserResponseDTO {
  @Field({ nullable: true })
  message: string;

  @Field(() => UpdatedUserData, { nullable: true })
  userData: UpdatedUserData;
}
