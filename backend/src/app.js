const blaha = require('./blaha');
const path = require('path');

const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res ,next) {
	console.log(blaha.getName());
    next();
	console.log("efter");
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/ping', function(req, res) {
	console.log("i ping");
	var status = {status: 'success'};
	res.json(status);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))