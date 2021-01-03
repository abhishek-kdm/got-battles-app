import battleResolvers from './battle.resolvers';

export default {
  Query: {
    ping: () => 'pong',
    ...battleResolvers,
  }
};
