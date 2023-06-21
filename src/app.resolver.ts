import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  // to check the connection
  @Query(() => String)
  checkServer() {
    return 'Server is up and running!';
  }
}
