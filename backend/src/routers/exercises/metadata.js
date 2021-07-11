const Router = require('express-promise-router');
const router = new Router();
const db = require('../../db/queries');

// TODO: remove it when DB is introduced!
const metadataModelMock = require('../../mock-data/exerciseMetadata');

const FieldNames = {
    SID: {name: 'sid', dbName: 'sid'},
    NAME: {name: 'name', dbName: 'name'},
    ITEM: {name: 'item', dbName: 'item'},
    WITHREPS: {name: 'withReps', dbName: 'withreps'}
};

router.use((req, res, next) => {
  console.log('Router: Metadata');
  next();
});

/**
* Get exercises metadata
**/
router.get('/', async(req, res) => {
    // get data from DB
    var metadata = [];

    try {
        const { rows } = await db.getExerciseMetadata();
        // mapping response
        rows.forEach( (value) => {
            var obj = {};
            obj[FieldNames.SID.name] = value[FieldNames.SID.dbName];
            obj[FieldNames.NAME.name] = value[FieldNames.NAME.dbName];
            obj[FieldNames.ITEM.name] = value[FieldNames.ITEM.dbName];
            obj[FieldNames.WITHREPS.name] = value[FieldNames.WITHREPS.dbName];
            metadata.push(obj);
        });
    } catch(err) {
        console.error(err);
        var errorMessage;
        if (err.toString().indexOf('connect ECONNREFUSED') >0) {
            errorMessage = 'Error getting exercise metadata from DB! DB is not reachable. Please try again later';
        } else {
            errorMessage = err;
        }
        res.status(500).json({message: errorMessage});
        return;
    }

    console.log('metadata=', metadata);
    res.json({exerciseMetadata: metadata});
});

module.exports = router;