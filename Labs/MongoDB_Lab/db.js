// to use mongoDB
const mongoose = require("mongoose");

// For your Lab 6, you can use the below connection method.
// You installed MongoDB on your AWS. Therefore, the DB location is "loccalhost"
mongoose.connect("mongodb://localhost/mydb", { useNewUrlParser: true, useUnifiedTopology: true });


module.exports = mongoose;