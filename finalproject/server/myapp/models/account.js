const db = require('../db');

//user account schema
const accountSchema = new db.Schema({
    email: String,
    password: String,
    zipcode: String,
    devices: Array,
    name: String
});

const Account = db.model('Account', accountSchema);
module.exports = Account;