var express = require('express');
var createConnection = require('../db');
var router = express.Router();

var conn = createConnection();


router.get('/', function(req, res, next) {
  conn = createConnection();
  conn.connect();

  var sql="select trip_name,intro,img_url,ID from trips";
  conn.query(sql, function(err, results, fields) {
      if (err) throw err;
      conn.end();
      res.render('trip',{results:results});
  });
});

router.post('/add', function(req, res, next) {
    conn = createConnection();
    conn.connect();
  
    var sql=`insert into trips (trip_name,intro,img_url) values ('${req.body.trip_name}','${req.body.intro}','${req.body.img_url}')`;
    console.log(sql);
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        
        res.redirect('/trip');
    });
  });

  router.get('/delete', function(req, res, next) {
    conn = createConnection();
    conn.connect();
  
    var sql=`DELETE FROM trips WHERE ID = ${req.query.trip_ID}`;
    console.log(sql);
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        
        res.redirect('/trip');
    });
  
  });

  router.get('/show_trip', function(req, res, next) {
    conn = createConnection();
    conn.connect();
  
    var sql=`SELECT * from trips WHERE ID = ${req.query.trip_ID}`;
    console.log(sql);
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        res.render('show_trip',{results:results});
    });
  
  });

module.exports = router;
