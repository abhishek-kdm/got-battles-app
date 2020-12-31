import { resolve } from 'path';
import { MongoClient } from 'mongodb';

export default async () => {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: resolve('.env') });
  }

  const MONGOOSE_URI = process.env.MONGOOSE_URI || '';
  const MONGOOSE_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  const client = new MongoClient(MONGOOSE_URI, MONGOOSE_OPTIONS);
  await client.connect();

  console.log(client.isConnected()
    ? 'MongoAtlas DB connection successfull.'
    : 'Couldn\'t connect to db');

  return client.db('test');
};
