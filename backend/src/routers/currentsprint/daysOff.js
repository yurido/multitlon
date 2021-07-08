var express = require('express');
var router = express.Router();
var DAYSOFF_CACHE = {daysOff:[]};

router.use((req, res, next) => {
  console.log('Router: DaysOff, cache=', DAYSOFF_CACHE.daysOff.length);
  next();
});

/**
* Get user's days-off for curret sprint
**/
router.get('/', (req, res) => {
    var data = [];
    // TODO: remove it when DB is introduced!
    if(DAYSOFF_CACHE.daysOff.length === 0) {
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 2).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 3).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 8).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 12).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 22).getTime());
        data.push(new Date(new Date().getFullYear(), new Date().getMonth(), 23).getTime());
        DAYSOFF_CACHE = {daysOff:data};
    }
    res.json(DAYSOFF_CACHE);
});

/**
* Creates new days-off in current sprint
**/
router.post('/', (req, res) =>  {
    // TODO: remove it when DB is introduced! Change to DB call!
    DAYSOFF_CACHE = req.body;
    res.json({status: 200});
});

module.exports = router;