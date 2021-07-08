var express = require('express');
var router = express.Router();
// TODO: remove it when DB is introduced!
var sprintExercisesModelMock = require('../../mock-data/sprintExercises');
// TODO: remove it when DB is introduced!
var CURRENT_ID = 15;
// TODO: remove it when DB is introduced!
var sprintAvailableExercisesModelMock = require('../../mock-data/availableExercises');

router.use((req, res, next) => {
  console.log('Router: Sprint Exercises');
  next();
});

/**
* Get user's available exercises for current sprint
**/
router.get('/available', (req, res) => {
    res.json(sprintAvailableExercisesModelMock);
});

/**
* Get all user exercises in current sprint
**/
router.get('/', (req, res) => {
    // TODO: Change to DB call!
    for(var i=0; i<sprintExercisesModelMock.exercises.length; i++) {
        var day = new Date(sprintExercisesModelMock.exercises[i].date).getDate();
        var newDateNumber = new Date(new Date().getFullYear(), new Date().getMonth(), day).getTime();
        sprintExercisesModelMock.exercises[i].date = newDateNumber;
    }
    res.json(sprintExercisesModelMock);
});

/**
* Add new exercise to current sprint
**/
router.post('/', (req, res) => {
    // TODO: remove it when DB is introduced! Change to DB call!
    const exercise = req.body;
    CURRENT_ID+=1;
    var newExercise = {id: CURRENT_ID, sid: exercise.sid, date: exercise.date, reps: [], rawPoints: exercise.rawPoints, totalPoints: 1652, time: 0};
    if(newExercise.rawPoints === 0) {
        newExercise.rawPoints = 1566;
    }
    res.json(newExercise);
});

/**
* Update user's exercise in current sprint
**/
router.put('/', (req, res) => {
    // TODO: Change it to DB call!
    const exercise = req.body;
    if (exercise.reps.length > 0) {
        exercise.rawPoints = exercise.rawPoints + 1500;
    }
    exercise.totalPoints = exercise.totalPoints + 800;
    res.json(exercise);
});

/**
* Delet user's exercise from current sprint
**/
router.delete('/', (req, res) => {
    // TODO: Change it to DB call!
    console.log('...deleting exercise with id %s, url=%s', req.id, req.url);
    res.json({status: 200});
});

module.exports = router;