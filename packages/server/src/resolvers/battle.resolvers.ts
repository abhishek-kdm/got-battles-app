import { IFieldResolver } from 'apollo-server';
import { Collection, ObjectID } from 'mongodb';
import { BattleDBSchema } from '../declarations';

type BattleFieldResolver = IFieldResolver<any, { Battle: Collection<BattleDBSchema> }, Record<string, string>>;

const FIELDS = ['attacker_king', 'attacker_commander', 'attacker_1', 'attacker_2',
  'attacker_3', 'attacker_4', 'defender_king', 'defender_commander', 'defender_1',
  'defender_2', 'defender_3', 'defender_4', 'battle_type', 'location', 'name', 'region'];


const battle: BattleFieldResolver = async (_1, { id }, { Battle }, _2) => {
  const data = await Battle.findOne({ _id: new ObjectID(id) });
  return data ? { ...data, id: data._id.toHexString() } : data;
}

const battles: BattleFieldResolver = async (_1, { param }, { Battle }, _2) => {
  const mapped = (xs: BattleDBSchema[]) => xs.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

  if (param) {
    const keywords = param.replace(/\s+/g, ' ').split(' ');

    const $and = keywords.reduce((acc, keyword) => {
      acc.push({
        $or: FIELDS.map((field) => {
          return { [field]: new RegExp(`.*${keyword}.*`, 'gi') };
        })
      });
      return acc;
    }, [] as any[]);

    return mapped(await Battle.find({ $and }).toArray());
  }
  return mapped(await Battle.find({}).toArray());
}

export default { battle, battles };
