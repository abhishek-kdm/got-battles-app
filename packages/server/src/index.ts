import { ApolloServer } from 'apollo-server';
import { Collection } from 'mongodb';

import typeDefs from './schema';
import resolvers from './resolvers';
import makeConnection from './connection';

import { BattleDBSchema } from './declarations';

let Battle: Collection<BattleDBSchema>;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: false,
  context: async () => {
    if (!Battle) {
      const DB = await makeConnection();
      Battle = DB.collection('battles');
    }
    return { Battle };
  },
});

server
  .listen(process.env.PORT || 4000)
  .then(({ url }) => { console.log(`Graphql server started on ${url}`) });
