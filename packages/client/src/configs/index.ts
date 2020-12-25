import Package from '../../package.json';

export const SERVER_URI = (process.env.NODE_ENV === 'production'
  ? `https://${Package.name}.netlify.app/` : `http://localhost:4000/`) + `.netlify/functions`;

export const BATTLE_LIST_API = (id: string) => `${SERVER_URI}/battle/${id}`;

