var express = require('express');
var router = express.Router();

router.post('/save', function (res, req) {
    console.log('Autosaving.....');
    let time = res.body.time;
    let employees = res.body.employees;
    console.log(employees);
    db.set('employees', employees)
      .write();
    console.log('Autosave Comleted!');
    console.log(db.get('employees').value());
  })

module.exports = router;