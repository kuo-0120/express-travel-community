var express = require('express');
var createConnection = require('../db');

var conn = createConnection();

var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.query.err == 1)
    {
        res.render('login',{err_text:"帳號或密碼錯誤，請重新登入"});
    }
    res.render('login');
});

router.post('/post',function(req,res){
    conn = createConnection();
    conn.connect();
    if(req.body.username==""||req.body.password=="")
    {
        return res.redirect('/');
    }
    else
    {
        var sql=`select user_ID from users where username = '${req.body.username}' AND user_password = '${req.body.password}'`;
        conn.query(sql, function(err, results, fields) {
            if (err) throw err;
            console.log(results[0]);
            if(results[0] === undefined)
            {
                console.log(results[0]);
                conn.end();
                return res.redirect('/login?err=1');
            }
            else
            {
                req.session.user_ID=results[0].user_ID;
                console.log(results[0].user_ID);
                conn.end();
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;