import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogoutResponseDTO {
  @Field()
  Message: string;
}
