var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('home.html',{root: '/home/ec2-user/my_server/AWS/myapp/public'});
});

module.exports = router;