'use strict';

const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const BattleRouter = require('./routes/battle.routes');
require('./connection')();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/.netlify/functions/battle', BattleRouter);

module.exports.handler = serverless(app);

