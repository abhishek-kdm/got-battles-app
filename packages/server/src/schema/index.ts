import { gql } from 'apollo-server';
import BattleSchema from './battle.schema.gql';

const TypeDef = gql`
  type Query {
    ping: String
    battle(id: String!): Battle
    battles(param: String): [Battle]
  }
`;

export default [TypeDef, BattleSchema];
