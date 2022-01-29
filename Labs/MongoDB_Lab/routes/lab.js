var express = require('express');
var router = express.Router();
var Recording = require("../models/lab");

router.post("/register", function(req, res) {
    const newRecord = new Recording({
        zip: req.body.zip,
        airQuality: req.body.airQuality
    });

    newRecord.save(function(err, recording) {
        if (err) {
            var errormsg = { "error": "zip and airQuality are required." };
            res.status(400).json(errormsg);
            console.log(errormsg);
        } else {


            var msg = { "response": "Data recorded." };
            res.status(201).json(msg);
            console.log(msg);
        }
    });

});


router.get("/status", function(req, res) {
    var zipcode = req.query.zip;
    //console.log(zipcode);
    Recording.find({ zip: zipcode }, function(err, records) {
        //console.log(records);
        if (err) {
            var errormsg = { "error": "Zip does not exist in the database." };
            res.status(400).json(errormsg);
        }
        if (!zipcode || zipcode.length != 5) {
            var errormsg = { "error": "a zip code is required." }
            res.status(400).json(errormsg);
        } else {
            if (records == null || records == "") {
                var errormsg = { "error": "Zip does not exist in the database." };
                res.status(400).json(errormsg);
            } else {
                let sum = 0;
                for (let i = 0; i < records.length; i++) {
                    sum += records[i].airQuality;
                    //console.log(records[i].airQuality)
                }
                let average = sum / records.length;

                res.status(200).json(average.toFixed(2));

            }

        }


        //console.log(records);
    });


});


module.exports = router;