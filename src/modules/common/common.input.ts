import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationArgs {
  @Field()
  offset: number; // number of rows to skip

  @Field()
  limit: number; // number of rows to return
}
