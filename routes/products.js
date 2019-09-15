var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("product");
});
router.get('/add', function(req, res, next) {
    res.send('add product');
  });
  router.get('/edit', function(req, res, next) {
    res.send('edit product');
  });
  router.get('/delete', function(req, res, next) {
    res.send('delete product');
  });
module.exports = router;
 