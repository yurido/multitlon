var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('Router: ExerciseProgress: sid:', req.sid);
  next();
});

router.get('/', function(req, res) {
    // TODO: remove it when DB is introduced!
    var data = {sid: req.sid, progress: 44, totalRaw: 123, totalPoints: 1500, averagePoints: 45, maxPonts: 500, quota: 16};
    res.json(data);
});

module.exports = router;