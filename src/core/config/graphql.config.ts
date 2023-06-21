import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

export const GraphQLConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  playground: {
    settings: {
      'editor.theme': 'light',
      'request.credentials': 'include',
    },
  },
  context: ({ req }) => {
    return {
      token: req.headers.token || null,
    };
  },
};
