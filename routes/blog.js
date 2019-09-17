var express = require('express');
var router = express.Router();

/* express-validator */
const { check, validationResult } = require('express-validator');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("blog");
});

router.get('/add', function(req, res, next) {
  res.render("addblog");
});
 /*แจ้ง errors -> รับจากไฟล์ addblog*/
router.post('/add', [ 
  check("name","กรุณาป้อนชื่อบทความ").not().isEmpty(), 
  check("description","กรุณาป้อนรายละเอียด").not().isEmpty(), 
  check("author","กรุณาป้อนชื่อผู้แต่ง").not().isEmpty() 
], function(req, res, next) {
  const result = validationResult(req);
  var errors=result.errors;
  if (!result.isEmpty()) {
    res.render('addblog',{errors:errors});
  }else{
    //insert to db
  }

});

module.exports = router;
 