var express = require('express');
var router = express.Router();
var sprintProgressModelMock = require('../../mock-data/sprintProgress');

router.use(function(req, res, next) {
  console.log('router Sprint progress');
  next();
});

router.get('/', function(req, res) {
    res.json(sprintProgressModelMock);
});

module.exports = router;