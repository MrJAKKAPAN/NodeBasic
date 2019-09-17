var express = require('express');
var router = express.Router();
/* express-validator */
const { check, validationResult } = require('express-validator');


/*  import monk มา connect db*/ 
/* 1 */
const db = require('monk')("localhost:27017/NodebasicDB")

/* 2 */
// const monk = require('monk') 
// const url = 'localhost:27017/NodebasicDB';




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

    //insert to db ให้เข้าถึงชื่อ blogs ใน database
    var ct=db.get('blogs'); 
    //เพิ่มข้อมูลลงใน database
    ct.insert({
      name:req.body.name,
      description:req.body.description,
      author:req.body.author
      //ตรวจสอบการผิดพลาดของข้อมูล
    },function(err,blog){
        if(err){
          res.send(err);
        }else{
          //แจ้งเตือน
          req.flash("success", "บันทึกข้อมูลเรียบร้อยแล้ว");
          //กลับไปหน้าแรก
          res.location('/blog/add'); //หน้าแรก
          res.redirect('/blog/add'); 

        }
    })
  }

});

module.exports = router;
 