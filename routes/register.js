var express = require('express');
var createConnection = require('../db');

var conn = createConnection();

var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.query.err == 1)
    {
        res.render('register',{err_text:"該帳號已被註冊或資料有誤"});
    }
    res.render('register');
});

router.post('/post',function(req,res){
    conn = createConnection();
    conn.connect();
    if(req.body.username==""||req.body.password==""||req.body.email=="")
    {
        return res.redirect('/register?err=1');
    }
    else
    {
        var sql=`select username from users where username = '${req.body.username}'`;
        conn.query(sql, function(err, results, fields) {
            if (err) throw err;
            if(results[0] === undefined)
            {
                sql_2 =`insert into users (username,user_password,email,tel_number,fax_number) values ('${req.body.username}','${req.body.password}','${req.body.email}','${req.body.tel_number}','${req.body.fax_number}')`;
                conn.query(sql_2, function(err, results, fields) {
                    if (err) throw err;
                    conn.end();
                    return res.redirect('/login');
                });
            }
            else
            {
                conn.end();
                return res.redirect('/register?err=1');
            }
            
        });
    }
});

module.exports = router;