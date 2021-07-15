var express = require('express');
var router = express.Router();
var DAYSOFF_CACHE = [];

router.use((req, res, next) => {
  console.log('Router: DaysOff, cache=', DAYSOFF_CACHE.length);
  next();
});

/**
* Get user's days-off for curret sprint
**/
router.get('/', (req, res) => {
    // TODO: remove it when DB is introduced!
    if(DAYSOFF_CACHE.length === 0) {
        DAYSOFF_CACHE.push(new Date(new Date().getFullYear(), new Date().getMonth(), 2).getTime());
        DAYSOFF_CACHE.push(new Date(new Date().getFullYear(), new Date().getMonth(), 3).getTime());
        DAYSOFF_CACHE.push(new Date(new Date().getFullYear(), new Date().getMonth(), 8).getTime());
        DAYSOFF_CACHE.push(new Date(new Date().getFullYear(), new Date().getMonth(), 12).getTime());
        DAYSOFF_CACHE.push(new Date(new Date().getFullYear(), new Date().getMonth(), 22).getTime());
        DAYSOFF_CACHE.push(new Date(new Date().getFullYear(), new Date().getMonth(), 23).getTime());
    }
    res.json({daysOff:DAYSOFF_CACHE});
});

/**
* Creates new days-off in current sprint
**/
router.post('/', (req, res) =>  {
    // TODO: remove it when DB is introduced! Change to DB call!
    DAYSOFF_CACHE = req.body.daysOff;
    res.json({status: 200});
});

module.exports = router;