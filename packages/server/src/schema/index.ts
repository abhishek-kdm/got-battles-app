import { gql } from 'apollo-server';
import BattleSchema from './battle.schema.gql';

const TypeDef = gql`
  type Query {
    battle(id: String!): Battle
    battles(param: String): [Battle]
  }
`;

export default [TypeDef, BattleSchema];
