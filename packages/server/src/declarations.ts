import { ObjectID } from 'mongodb';

export interface BattleDBSchema {
  _id: ObjectID
  attacker_1: String
  attacker_2: String
  attacker_3: String
  attacker_4: String
  attacker_commander: String
  attacker_king: String
  attacker_king_bg: String
  attacker_king_img: String
  attacker_outcome: String
  attacker_size: Number
  battle_number: Number
  battle_type: String
  defender_1: String
  defender_2: String
  defender_3: String
  defender_4: String
  defender_commander: String
  defender_king: String
  defender_king_bg: String
  defender_king_img: String
  defender_size: Number
  location: String
  major_capture: Number
  major_death: Number
  name: String
  note: String
  region: String
  summer: Number
  year: Number
}
