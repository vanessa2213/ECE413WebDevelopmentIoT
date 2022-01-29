// 1. create a router as a module
var express = require('express');
var router = express.Router();

// 2. defines some routes
router.get('/login', function(req, res) {
    console.log("Get:");
    console.log(req.query);
    res.send("[Get] recieved your request! Rx query: " + JSON.stringify(req.query));
});

router.post('/login', function(req, res) {
    console.log("POST:");
    console.log(req.body);
    res.send("[POST] received your request! Rx body: " + JSON.stringify(req.body));
});

router.get('/[\w]+/', function(req, res) {
    console.log("Not yet supported");
    next(err);

})






// 3. mounts the router module on a path in the main app
module.exports = router;