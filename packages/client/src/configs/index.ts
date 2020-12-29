import Package from '../../../../package.json';

export const SERVER_URI = process.env.NODE_ENV === 'production'
  ? `https://${Package.name}.netlify.app/`
  : `http://localhost:4000`;

export const GraphqlOptions = {
  commonHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, hr',
    'Connection': 'keep-alive',
  },
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
