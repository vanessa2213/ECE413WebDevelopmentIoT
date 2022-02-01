var express = require('express');
var router = express.Router();
let bcrypt = require("bcrypt");
let jwt = require("jwt-simple");
let fs = require('fs');
let Account = require('../models/account');
let Device = require('../models/device');

const secret = fs.readFileSync(__dirname + '/../keys/jwtkey').toString();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.sendFile('login.html',{root: '/home/ec2-user/my_server/AWS/myapp/public'});
});
//GET sign up page
router.get('/signUp', function(req, res, next){
  res.sendFile('signUp.html',{root: '/home/ec2-user/my_server/AWS/myapp/public'});
});
//Create a new user
router.post('/signUp', function(req, res){
 Account.findOne({ email: req.body.email }, function (err, account) {
    /*error*/
    if(err){
      res.status(400).json({success: false, message: err.errmsg});
    }
    else if (account) {
      res.status(401).json({ success: false, msg: "This email already used" });
    }
    else{
      //hash password
      passwordHash = bcrypt.hashSync(req.body.password,10);
      //create a new device
      const newDevice = new Device({
        deviceID: req.body.deviceID,
        apiKey: req.body.api
      });
      //create a new account
      const newAccount = new Account({
        email: req.body.email,
        password: passwordHash,
        zipcode: req.body.zip,
        device: newDevice
      });
      //save new device
      newDevice.save(function(err, device){
        if(err){
          res.status(400).json({success:false,message: err.errmsg});
        }
        else{
          res.status(201).json({success:true, message: account.email + "is now registered."});
          console.log('Device Saved');
        }
      })
      //save new account
      newAccount.save(function(err,account){
        if(err){
          res.status(400).json({success:false,message: err.errmsg});
        }
        else{
          res.status(201).json({success:true, message: account.email + "is now registered."});
          console.log('Account Saved');
        }
      });
    }
  });
});
//login user
router.post("/", function (req, res) {
  if (!req.body.email || !req.body.password) {
      res.status(401).json({ error: "Missing email and/or password" });
      console.log("Missing email and/or password");
      return;
  }
  // Get user from the database
  Account.findOne({ email: req.body.email }, function (err, account) {
    if (err) {
        res.status(400).send(err);
    }
    else if (!account) {
        // Username not in the database
        res.status(401).json({ error: "Account not found. Please sign up." });
        console.log("Account not found. Please sign up.");
    }
    else {
      if (bcrypt.compareSync(req.body.password, account.password)) {
          const token = jwt.encode({ email: account.email }, secret);
          //update user's last access time
          //account.lastAccess = new Date();
         /*account.save((err, account) => {
              console.log("User's LastAccess has been update.");
          });*/
          // Send back a token that contains the user's username
          res.status(201).json({ success: true, token: token, msg: "Login success" });
          console.log('Login!');
      }
      else {
          res.status(401).json({ success: false, msg: "Email or password invalid." });
          console.log('password or email invalid.');
      }
    }
  });
});

module.exports = router;