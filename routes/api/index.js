var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json(200, 'Awesome to be API');
});

module.exports = router;
