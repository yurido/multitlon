var express = require('express');
var router = express.Router();
// TODO: remove it when DB is introduced!
var metadataModelMock = require('../../mock-data/exerciseMetadata');

router.use((req, res, next) => {
  console.log('Router: Metadata');
  next();
});

/**
* Get exercises metadata
**/
router.get('/', (req, res) => {
    res.json(metadataModelMock);
});

module.exports = router;