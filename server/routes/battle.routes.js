const { Router } = require('express');
const Battle = require('../models/battle.model');

const BattleRouter = Router();

BattleRouter.route('/').get((_, res) => {
  Battle.find({})
    .then((battles) => res.send(battles))
    .catch(() => { res.status(500).send('Server Error'); });
});


BattleRouter.route('/generic_search').get((req, res) => {
  const { param } = req.query;

  const keywords = param.replace(/\s+/g, ' ').split(' ');

  const fields = [
    'attacker_king',
    'attacker_commander',
    'attacker_1',
    'attacker_2',
    'attacker_3',
    'attacker_4',
    'defender_king',
    'defender_commander',
    'defender_1',
    'defender_2',
    'defender_3',
    'defender_4',
    'battle_type',
    'location',
    'name',
    'region',
  ];

  /**
   * @description
   * $and
   *    $or [ { field1: keyword1 }, { field2: keyword1 }, ... ]
   *    $or [ { field1: keyword2 }, { field2: keyword2 }, ... ]
   */
  const andQuery = keywords.reduce((acc, keyword) => {
    acc.push({
      $or: fields.map((field) => {
        return { [field]: new RegExp(`.*${keyword}.*`, 'gi') };
      })
    });
    return acc;
  }, []);


  Battle.find({ $and: andQuery })
    .then((battles) => res.json(battles))
    .catch((_) => { res.status(500).send('Database Error'); });
});


module.exports = BattleRouter;

