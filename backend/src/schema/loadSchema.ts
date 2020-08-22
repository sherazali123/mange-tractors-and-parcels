import { gql } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import { GraphQLSchema } from 'graphql';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';
import { mergeSchemas } from 'graphql-tools';

import AuthDirective from './directives/authDirective';

const allTypes: GraphQLSchema[] = fileLoader(path.join(__dirname, './**/*.graphql'));
const allResolvers: any[] = fileLoader(path.join(__dirname, './**/resolvers.*'));
const mergedResolvers = mergeResolvers(allResolvers);

const typeDefs = gql`
  ${allTypes.join('\n')}
`;

export default mergeSchemas({
  schemas: [
    buildFederatedSchema([
      {
        typeDefs,
        resolvers: mergedResolvers,
      },
    ]),
  ],
  schemaDirectives: {
    requireAuth: AuthDirective,
  },
});
