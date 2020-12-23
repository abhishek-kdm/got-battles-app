const express = require('express');
const cors = require('cors');

const { resolve } = require('path');
const { connect, connection } = require('mongoose');

const BattleRouter = require('./routes/battle.routes');

// custom process env variables.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: resolve(__dirname, '.env') });
}

const PORT = process.env.PORT || 4000;
const MONGOOSE_URI = process.env.MONGO_ATLAS_URI;

// mongo stuff.
connect(MONGOOSE_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

connection.once('open', () => {
  console.log('MongoDB  connection established successfully.');
});

// express stuff.
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/battle', BattleRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

