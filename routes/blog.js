var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("blog");
});

router.get('/add', function(req, res, next) {
  res.render("addblog");
});

router.post('/add', function(req, res, next) {
  console.log(req.body.name);
  console.log(req.body.description);
  console.log(req.body.author);
});

module.exports = router;
 