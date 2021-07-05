var express = require('express');
var router = express.Router();
var metadataModelMock = require('../../mock-data/exerciseMetadata');

router.use(function(req, res, next) {
  console.log('router Metadata');
  next();
});

router.get('/', function(req, res) {
    res.json(metadataModelMock);
});

module.exports = router;