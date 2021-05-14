var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('router Exercise: time: ', Date.now());
  next();
});
router.get('/', function(req, res) {
    console.log('exercise GET: time ', Date.now());
    var data = {status: 'some exercise json data'};
    res.json(data);
});
router.post('/', function(req, res) {
    var status = {status: 'ok!'};
    res.json(status);
});

module.exports = router;