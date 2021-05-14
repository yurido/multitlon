const exercise = require('./routers/exercise');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const basePath = '/rest';

app.use(function(req, res, next) {
	console.log('main app enter point, time: ', Date.now());
    next();
});
app.use(`${basePath}/exercise`, exercise);

app.get(basePath, function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get(`${basePath}/ping`, function(req, res) {
	console.log("i ping");
	var status = {status: 'success'};
	res.json(status);
});

app.listen(port, () => console.log(`Backend server is listening on port ${port}!`));