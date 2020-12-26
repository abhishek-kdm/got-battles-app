'use strict';

const { resolve } = require('path');
const { connect } = require('mongoose');

module.exports = () => {
  // custom process env variables.
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: resolve(__dirname, '.env') });
  }

  // const PORT = process.env.PORT || 4000;
  const MONGOOSE_URI = process.env.MONGO_ATLAS_URI;
  const MONGOOSE_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  // mongo stuff.
  connect(MONGOOSE_URI, MONGOOSE_OPTIONS)
    .then(() => { console.log('MongoDB  connection established successfully.') })
    .catch(console.log);
}

