var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.user_ID !== undefined)
    {
        delete req.session.user_ID;
    }
    res.redirect('/');
});

module.exports = router;

