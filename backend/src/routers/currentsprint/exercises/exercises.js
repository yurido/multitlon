var express = require('express');
var router = express.Router();
// TODO: remove it when DB is introduced!
var sprintExercisesModelMock = require('../../../mock-data/sprintExercises');
// TODO: remove it when DB is introduced!
var CURRENT_ID = 15;

router.use((req, res, next) => {
  console.log('router Sprint exercises');
  setTimeout(() => {
    console.log('delay 2 sec');
    next();
    }, 2000);
});

router.get('/', (req, res) => {
    // TODO: remove it when DB is introduced! Change to DB call!
    for(var i=0; i<sprintExercisesModelMock.exercises.length; i++) {
        var day = new Date(sprintExercisesModelMock.exercises[i].date).getDate();
        var newDateNumber = new Date(new Date().getFullYear(), new Date().getMonth(), day).getTime();
        sprintExercisesModelMock.exercises[i].date = newDateNumber;
    }
    res.json(sprintExercisesModelMock);
});

router.post('/', (req, res) => {
    // TODO: remove it when DB is introduced! Change to DB call!
    console.log('POST new exercise: ', req.body);
    var exercise = req.body;
    CURRENT_ID+=1;
    var newExercise = `{"id": ${CURRENT_ID}, "sid": "${exercise.getSid()}", "date": ${exercise.date}, "reps": [], "rawPoints": ${exercise.rawPoints}, "totalPoints": 1652, "time": 0}`;
    if(newExercise.rawPoints === 0) {
        newExercise.rawPoints = 1566;
    }
});

module.exports = router;