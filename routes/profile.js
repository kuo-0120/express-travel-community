var express = require('express');
var createConnection = require('../db');
var conn = createConnection();
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.user_ID === undefined)
    {
        return res.redirect('/login');
    }
    conn = createConnection();
    conn.connect();
    console.log(req.session.user_ID);
    var sql=`select username,email,tel_number,fax_number from users where user_ID = ${req.session.user_ID}`;
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        res.render('profile',{username:results[0].username,email:results[0].email,tel_number:results[0].tel_number,fax_number:results[0].fax_number});
    });
});

router.post('/post', function(req, res, next) {
    conn = createConnection();
    conn.connect();
    var sql=`update users set tel_number = '${req.body.tel_number}', fax_number = '${req.body.fax_number}', email = '${req.body.email}' where user_ID=${req.session.user_ID};`;
    console.log(sql);
    conn.query(sql, function(err, results, fields) {
        if (err) throw err;
        conn.end();
        
        res.redirect('/profile');
    });
  });

module.exports = router;
