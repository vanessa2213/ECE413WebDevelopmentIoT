//mongoDB
const mongoose = require('mongoose');
//connect mongoDB to AWS
mongoose.connect("mongodb://localhost/myDbs", { useNewUrlParser: true, useUnifiedTopology:true });

module.exports = mongoose;