import Package from '../../../../package.json';
import ServerPackage from '../../../server/package.json';

export const SERVER_URI = process.env.NODE_ENV === 'production'
  ? `https://${Package.name}-${ServerPackage.name}.herokuapp.com`
  : `http://localhost:4000`;

export const GQLRequestInit = (body: string) => ({
  body,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, hr',
    'Connection': 'keep-alive',
  }
} as RequestInit);

export const GQLOptions = {
  commonQueryFields: `
    id
    year
    name
    battle_type
    attacker_outcome
    attacker_king
    attacker_king_bg
    attacker_king_img
    attacker_size
    attacker_1
    attacker_2
    attacker_3
    attacker_4
    defender_king
    defender_king_bg
    defender_king_img
    defender_size
    defender_1
    defender_2
    defender_3
    defender_4
    major_capture
    major_death
    location
    region
    note
  `,
};
