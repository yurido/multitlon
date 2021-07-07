var express = require('express');
var router = express.Router();
// TODO: remove it when DB is introduced!
var sprintAvailableExercisesModelMock = require('../../../mock-data/availableExercises');

router.use(function(req, res, next) {
  console.log('Router: AvailableExercises');
  next();
});

router.get('/', function(req, res) {
    res.json(sprintAvailableExercisesModelMock);
});

module.exports = router;
