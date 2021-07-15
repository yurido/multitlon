const Router = require('express-promise-router');
const router = new Router();
const db = require('../../db/db');
const MetadataMapper = require('../../db/mapper/metadataMapper');
const metadataMapper = new MetadataMapper();
const errorService = require('../../service/errorService');

var METADATA_CACHE = [];

router.use((req, res, next) => {
  console.log('Router: Metadata, cache=', METADATA_CACHE.length);
  next();
});

/**
* Get exercises metadata
**/
router.get('/', async(req, res) => {
    try {
        if (METADATA_CACHE.length === 0) {
            const data = await db.getExerciseMetadata();
            // console.log(   'data=', data);
            // mapping response
            data.forEach( (value) =>
                METADATA_CACHE.push(metadataMapper.getJSONObject(value))
            );
            console.log('   Got metadata from DB');
            // console.log('metadata=', METADATA_CACHE);
            res.json({exerciseMetadata: METADATA_CACHE});
        }
    } catch(err) {
        console.error(err);
        if (err.toString().indexOf('connect ECONNREFUSED') >0) {
            res.status(500).json(errorService.getErrorJSONObject(errorService.ErrorType.DB,
                'Error getting exercise metadata from DB! DB is not reachable. Please try again later'));
        } else if(err.toString().indexOf('Database mapping error')) {
            res.status(500).json(errorService.getErrorJSONObject(errorService.ErrorType.DB_MAPPING, err.toString()));
        } else {
            res.status(500).json(errorService.getErrorJSONObject(errorService.ErrorType.SERVER, err.toString()));
        }
    }
});

module.exports = router;