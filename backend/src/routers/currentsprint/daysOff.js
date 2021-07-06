var express = require('express');
var router = express.Router();
var DAYSOFF_CACHE = [];

router.use((req, res, next) => {
  console.log('router Days-off: cache=', DAYSOFF_CACHE.length);
  setTimeout(() => {
      console.log('delay 2 sec');
      next();
      }, 2000);
});

router.get('/', (req, res) => {
    var data = [];
    // TODO: remove it when DB is introduced!
    if(DAYSOFF_CACHE.length ===0) {
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 2).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 3).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 8).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 12).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 22).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 23).getTime());
        DAYSOFF_CACHE = data;
    } else {
        data = DAYSOFF_CACHE;
    }
    res.json(data);
});

router.post('/', (req, res) =>  {
    // TODO: remove it when DB is introduced! Change to DB call!
    console.log('POST new days-off: ', req.body);
    DAYSOFF_CACHE = req.body;
    res.json({status: OK});
});

module.exports = router;