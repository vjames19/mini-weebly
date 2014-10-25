var express = require('express');
var router = express.Router();

/**
 * Should be added as the last route to support Angular's html5mode.
 */
router.get('/*', function(req, res) {
  res.sendFile('dist/index.html');
});

module.exports = router;
