import 'reflect-metadata';
import app from './app';
import { createConnection, Connection } from 'typeorm';
import { ApolloServer, Request } from 'apollo-server-express';

import schema from './schema/loadSchema';
import config from './config';
// import AuthDirective from './shared/helpers/AuthDirective';
import Context from './schema/context';
import handleAuth from './middleware/handleAuth';
import { Admin as AdminInterface } from './interfaces/admin';

const { defaultUser, disableAuthAccess, server } = config;

const setupAuthContext = async (connection: Connection, schema: any, req: Request) => {
  let auth: AdminInterface;
  const { user }: any = await handleAuth({ req });

  if (disableAuthAccess) {
    auth = defaultUser;
  } else {
    auth = user;
  }

  return new Context(connection, schema, req, auth);
};

const startServer = async (): Promise<void> => {
  try {
    const connection = await createConnection();
    const server = new ApolloServer({
      schema,
      async context({ req }: { req: Request }) {
        const ctx = await setupAuthContext(connection, schema, req);
        ctx.req = req;
        return ctx;
      },
      introspection: true,
      playground: true,
    });
    server.applyMiddleware({ app, path: '/graphql' });
  } catch (error) {
    console.log('CreateConnection:Error: ', error);
  }

  app.listen({ port: server.port }, () => console.log(`Server ready at ${server.host}:${server.port}/graphql`));
};

startServer();

process.on('uncaughtException', (err) => {
  console.log(err);
});
