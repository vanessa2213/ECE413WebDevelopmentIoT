var express = require('express');
var router = express.Router();
let jwt = require("jwt-simple");
let fs = require('fs');
let Account = require('../models/account');
let Device = require('../models/device');

const secret = fs.readFileSync(__dirname + '/../keys/jwtkey').toString();

//GET settings page
router.get('/', function(req, res, next) {
    res.sendFile('settings.html',{root: '/home/ec2-user/my_server/AWS/myapp/public'});
});
//get current user info
router.post('/', function(req, res, next){
    const decode = jwt.decode(req.body.token, secret);
    //Find user email in database
    Account.findOne({ email: decode.email }, function (err, account) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            curInfo = {
                email: account.email,
                name: account.name,
                zip: account.zipcode,
                devices: account.devices
            }
        }
        res.status(201).send(curInfo);
    });
});
//Add name to account
router.post('/addName', function(req, res, next) {
    //check for input
    if(!req.body.name){
        res.status(401).json({ error: "No name entered" });
        console.log("No name entered");
        return;
    }
    else{
        //decode token to access user email
        const decode = jwt.decode(req.body.token, secret);
        console.log(decode.email);
        //Find user email in database
        Account.findOne({ email: decode.email }, function (err, account) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                account.name = req.body.name;
                account.save();
                console.log(account.name);
                res.status(200);
            }
        });
    }
});
//Add zip to account
router.post('/addZipcode', function(req, res, next) {
    //console.log(localStorage.getItem("token"));
    if(!req.body.zip){
        res.status(401).json({ error: "No name entered" });
        console.log("No name entered");
        return;
    }
    else{
        //decode token to access user email
        const decode = jwt.decode(req.body.token, secret);
        //Find user email in database
        Account.findOne({ email: decode.email }, function (err, account) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                account.zipcode = req.body.zip;
                account.save();
                console.log(account.zipcode);
                res.status(200);
            }
        });
    }
});
//Add new device to account
router.post('/addDevice', function(req, res, next) {
    //console.log(localStorage.getItem("token"));
    if(!req.body.api || !req.body.deviceID){
        res.status(401).json({ error: "Enter all device information" });
        console.log("Fill in all device information");
        return;
    }
    else{
        //decode token to access user email
        const decode = jwt.decode(req.body.token, secret);
        //Find user email in database
        Account.findOne({ email: decode.email }, function (err, account) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                //create a new device
                const newDevice = new Device({
                    deviceID: req.body.deviceID,
                    apiKey: req.body.api
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
                });
                account.devices.push(newDevice);
                account.save();
                console.log(account.devices);
                res.status(200);
            }
        });
    }
});
//Remove device from account
router.post('/removeDevice', function(req, res, next) {
    //console.log(localStorage.getItem("token"));
    if(!req.body.deviceID){
        res.status(401).json({ error: "Enter device ID" });
        console.log("Device ID not entered.");
        return;
    }
    else{
        //decode token to access user email
        const decode = jwt.decode(req.body.token, secret);
        //Find user email in database
        Account.findOne({ email: decode.email }, function (err, account) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            else {
                //find device id in database
                Device.findOne({deviceID: req.body.deviceID}, function(err,device){
                    if (device == null) {
                        res.status(400).json({success:false,message:'Device ID not on account.'});
                    }
                    else{
                        //delete from db
                        device.remove();
                        console.log("Device deleted");
                    }
                });
                //get index of account that has been removed
                let index = account.devices.map(function(e){return e.deviceID}).indexOf(req.body.deviceID);
                //remove from account
                account.devices.splice(index,1);
                account.save();
                console.log(account.devices);
                res.status(200);
            }
        });
    }
});


module.exports = router;