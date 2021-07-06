var express = require('express');
var router = express.Router();
// TODO: remove it when DB is introduced!
var metadataModelMock = require('../../mock-data/exerciseMetadata');

router.use((req, res, next) => {
  console.log('router Metadata');
  setTimeout(() => {
      console.log('delay 2 sec');
      next();
      }, 2000);
});

router.get('/', (req, res) => {
    res.json(metadataModelMock);
});

module.exports = router;