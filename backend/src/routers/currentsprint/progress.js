var express = require('express');
var router = express.Router();
// TODO: remove it when DB is introduced!
var sprintProgressModelMock = require('../../mock-data/sprintProgress');

router.use((req, res, next) => {
  console.log('Router: SprintProgress');
  next();
});

/**
* Get Sprint progress or exercise progress for user
**/
router.get('/', (req, res) => {
    if (req.sid === undefined) {
        res.json(sprintProgressModelMock);
    } else {
        var data = {sid: req.sid, progress: 44, totalRaw: 123, totalPoints: 1500, averagePoints: 45, maxPonts: 500, quota: 16};
        res.json(data);
    }
});

module.exports = router;