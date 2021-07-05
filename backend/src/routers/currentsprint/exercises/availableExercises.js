var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('router availableExercises');
  next();
});

router.get('/', function(req, res) {
    var data = {
                 "exercises": [
                   "PUSH-UPS",
                   "PULL-UPS",
                   "BARS",
                   "BICEPS",
                   "TRICEPS",
                   "ABS",
                   "SHOULDERS",
                   "OVERHEAD_PRESS",
                   "SQUATS",
                   "SWIM",
                   "RUN",
                   "CYCLING",
                   "DEADLIFT",
                   "CALVES",
                   "PLANK",
                   "ZUMBA",
                   "BODY-PUMP",
                   "SCOOTER",
                   "BURPEE",
                   "SKATING",
                   "SKIING",
                   "SNOWBOARDING",
                   "DANCING",
                   "YOGA",
                   "STRETCHING",
                   "TENNIS",
                   "SHAPE-UP",
                   "KNEE-ROLL-OUT",
                   "ZEPN",
                   "HYPEREXTENSION",
                   "BENCH-PRESS"
                 ]
               };
    res.json(data);
});

module.exports = router;
