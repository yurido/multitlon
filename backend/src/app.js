const exerciseMetadataRouter = require('./routers/exercises/metadata');
const availableExercisesRouter = require('./routers/currentsprint/exercises/availableExercises');
const sprintExercisesRouter = require('./routers/currentsprint/exercises/exercises');
const exerciseProgressRouter = require('./routers/currentsprint/exercises/exerciseProgress');
const daysOffRouter = require('./routers/currentsprint/daysOff');
const sprintProgressRouter = require('./routers/currentsprint/progress');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const basePath = '/';
const restPath = '/rest';

app.use((req, res, next) => {
	console.log('main app enter point');
    next();
});

app.use(`${restPath}/exercises/metadata`, exerciseMetadataRouter);
app.use(`${restPath}/currentsprint/exercises/available`, availableExercisesRouter);
app.use(`${restPath}/currentsprint/exercises`, sprintExercisesRouter);
app.use(`${restPath}/currentsprint/days-off`, daysOffRouter);
app.use(`${restPath}/currentsprint/progress`, sprintProgressRouter);
app.use(`${restPath}/currentsprint/exercises/:sid/progress`, (req, res, next) => {
    req.sid = req.params.sid;
    next();
}, exerciseProgressRouter);

app.get(basePath, (req, res) => {
	console.log("get Index.html!");
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get(`${restPath}/ping`, (req, res) => {
	console.log("PING! pong!");
	var status = {status: 'success'};
	res.json(status);
});

app.listen(port, () => console.log(`Backend server is listening on port ${port}!`));