var express = require('express');
var createConnection = require('../db');
var router = express.Router();

var conn = createConnection();


router.get('/', function(req, res, next) {
  conn = createConnection();
  conn.connect();

  var sql="select ID,username,bulletin_text from bulletins";
  conn.query(sql, function(err, results, fields) {
      if (err) throw err;
      conn.end();
      res.render('bulletin',{results:results});
  });
});

router.post('/add', function(req, res, next) {
    conn = createConnection();
    conn.connect();
  
    var sql=`insert into bulletins (username,bulletin_text) values ('${req.body.username}','${req.body.bulletinText}')`;
    console.log(sql);
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        
        res.redirect('/bulletin');
    });
  });

  router.get('/delete', function(req, res, next) {
    conn = createConnection();
    conn.connect();
  
    var sql=`DELETE FROM bulletins WHERE ID = ${req.query.bulletin_ID}`;
    console.log(sql);
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        
        res.redirect('/bulletin');
    });
  });

  router.post('/modify',function(req,res,next){
    conn = createConnection();
      conn.connect();
      var sql=`select ID, bulletin_text, username from bulletins where ID=${req.body.bulletin_ID};`;
      console.log(sql);
      conn.query(sql, function(err, results, fields) {
          if (err) throw err;
          conn.end();
          res.render('modify_bulletin',{results:results});
      });
  })

  router.post('/send_modify',function(req,res,next){
    conn = createConnection();
      conn.connect();
      var sql=`update bulletins set username = '${req.body.username}', bulletin_text = '${req.body.bulletin_text}' where ID=${req.query.bulletin_ID};`;
      console.log(sql);
      conn.query(sql, function(err, results, fields) {
          if (err) throw err;
          conn.end();
          
          res.redirect('/bulletin');
      });
  })

module.exports = router;
