import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';

@ObjectType()
export class UpdatedUserData extends OmitType(UserEntity, [
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
