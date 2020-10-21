export const SERVER_URI = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

export const GENERIC_SEARCH_URL = (value: string) => (
  `${SERVER_URI}/battle/generic_search/?param=${value}`
);

export const BATTLE_LIST_URL = `${SERVER_URI}/battle/`;

