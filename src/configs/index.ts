export const SERVER_URI = process.env.NODE_ENV === 'production'
  ? '' : 'http://localhost:4000';

export const BATTLE_LIST_API = (id: string) => `${SERVER_URI}/battle/${id}`;

