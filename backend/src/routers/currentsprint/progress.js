var express = require('express');
var router = express.Router();
// TODO: remove it when DB is introduced!
var sprintProgressModelMock = require('../../mock-data/sprintProgress');

router.use((req, res, next) => {
  console.log('Router: SprintProgress');
  next();
});

router.get('/', (req, res) => {
    res.json(sprintProgressModelMock);
});

module.exports = router;