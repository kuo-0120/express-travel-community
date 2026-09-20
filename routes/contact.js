var express = require('express');
var createConnection = require('../db');
var router = express.Router();

var conn = createConnection();


router.get('/', function(req, res, next) {
  if(req.session.user_ID === undefined)
  {
      return res.redirect('/login');
  }
  else
  {
    conn = createConnection();
    conn.connect();

    var sql=`select ID,unit_name, tel_number, fax_number, email, remark from address_book where user_ID = ${req.session.user_ID}`;
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        res.render('contact',{results:results});
    });    
  }

});

router.post('/add', function(req, res, next) {
    conn = createConnection();
    conn.connect();
  
    var sql=`insert into address_book (unit_name, tel_number, fax_number, email, remark, user_ID) values ('${req.body.unit_name}','${req.body.tel_number}','${req.body.fax_number}','${req.body.email}','${req.body.remark}','${req.session.user_ID}')`;
    console.log(sql);
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        
        res.redirect('/contact');
    });
  });

  router.get('/delete', function(req, res, next) {
    conn = createConnection();
    conn.connect();
  
    var sql=`DELETE FROM address_book WHERE ID = ${req.query.contact_ID}`;
    console.log(sql);
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        
        res.redirect('/contact');
    });
  });

  router.post('/modify', function(req, res, next) {
    conn = createConnection();
    conn.connect();

    var sql=`select ID,unit_name, tel_number, fax_number, email, remark from address_book where ID = ${req.body.contact_ID}`;
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        res.render('modify_contact',{results:results});
    });    
  });

  router.post('/send_modify', function(req, res, next) {
    conn = createConnection();
    conn.connect();
    var sql=`update address_book set unit_name = '${req.body.unit_name}', tel_number = '${req.body.tel_number}', fax_number = '${req.body.fax_number}', email = '${req.body.email}', remark = '${req.body.remark}' where ID=${req.query.contact_ID};`;
    console.log(sql);
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        
        res.redirect('/contact');
    });
  });

module.exports = router;
