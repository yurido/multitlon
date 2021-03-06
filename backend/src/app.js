const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// support parsing of application/json type post data
app.use(bodyParser.json());

const exerciseMetadataRouter = require('./routers/exercises/metadata');
const sprintExercisesRouter = require('./routers/currentsprint/exercises');
const daysOffRouter = require('./routers/currentsprint/daysOff');
const sprintProgressRouter = require('./routers/currentsprint/progress');
const testDataGenerator = require('./routers/testDataGenerator');

const port = 3000;
const basePath = '/';
const restPath = '/rest';

app.use((req, res, next) => {
	console.log('App enter point!');
	console.log('Request url=%s, method=%s', req.url, req.method);
	console.log('Request body=', req.body);

	if ((req.method === 'POST' || req.method === 'PUT') && req.body === undefined) {
        throw new URIError('POST body is not defined!');
    }

	if ((req.method === 'POST' || req.method === 'PUT') && typeof req.body !== 'object') {
        throw new TypeError('Request body type should be Object!');
	}

    // TODO: remove in Prod!
    setTimeout(() => {
      console.log('   request delay 2 sec');
      next();
    }, 2000);
});

app.use(`${restPath}/exercises/metadata`, exerciseMetadataRouter);
app.use(`${restPath}/currentsprint/exercises`, sprintExercisesRouter);
app.use(`${restPath}/currentsprint/exercises/:id`, (req, res, next) => {
    req.id = req.params.id;
    next();
}, sprintExercisesRouter);
app.use(`${restPath}/currentsprint/days-off`, daysOffRouter);
app.use(`${restPath}/currentsprint/progress`, sprintProgressRouter);
app.use(`${restPath}/currentsprint/progress/:sid`, (req, res, next) => {
    req.sid = req.params.sid;
    next();
}, sprintProgressRouter);

app.get(basePath, (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get(`${restPath}/ping`, (req, res) => {
	console.log("GET /ping request!");
	var status = {status: 200};
	res.json(status);
});

app.use(`${restPath}/testdata`, testDataGenerator);

app.listen(port, () => console.log(`Backend server is listening on port ${port}!`));