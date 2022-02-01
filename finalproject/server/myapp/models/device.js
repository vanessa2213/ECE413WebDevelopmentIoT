const db = require('../db');

//device schema
const deviceSchema = new db.Schema({
    deviceID: String,
    apiKey: String
});

const Device = db.model('Device', deviceSchema);
module.exports = Device;