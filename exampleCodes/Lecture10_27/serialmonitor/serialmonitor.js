// Serial monitor example
// use "serialport" package in node.js
// https://serialport.io/
// to use this, you should install serial port
// npm install serialport
// https://serialport.io/docs/guide-installation
//
// APIs: https://serialport.io/docs/api-serialport


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serial communication
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var serialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter')

// global varialbes for serial communication
const serialPortsList = [];
var serialComPort = null;
var parser = null;

// scan available serial ports
function scanPorts() {
    serialPort.list().then (
        (ports) => {
            console.log(`: available serial ports (# of ports: ${ports.length})`);
            let index = 0;
            ports.forEach(port => {
                serialPortsList.push(port.path);
                console.log(`[${index++}] ${port.path}`);
            });
            console.log(`please press the index to open your serial port`);
        }
    );
}

function openPort(pathStr) {
    if (serialComPort != null) {
        console.log(`Please close your ${serialComPort.path}!!`);
        return;
    }
    console.log(`Opening serial monitor for com port: "${pathStr}"`)
    serialComPort = new serialPort(pathStr, {baudRate: 9600, autoOpen:false});
    parser = serialComPort.pipe(new Delimiter({ delimiter: '\r\n' }));
    parser.on('data', function (data) {
        simulatedClock(JSON.parse(data));
    });

    serialComPort.open(function (err) {
        if (err) {
            console.log(`Error opening port: ${err.message}`);
        }
        else {
            console.log(`Serial monitor opened successfully (Data rate: ${this.baudRate})`);
        }
    });
}

function closePort() {
    serialComPort.close( function (err) {
        if (err) {
            console.log(`Something wrong while closing your comport ${this.path}`);
        }
        else {
            console.log(`${this.path} has been closed`);
            serialComPort = null;
            parser = null;
        }
    });
}

// Self-involking function
(function() {
    console.log("============= Serial Monitor =============");
    scanPorts();
})();


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// To process key inputs
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }
    else if (key.name === 'x') {
        console.log(`Now closing ${serialComPort.path}`);
        closePort();
    } 
    else if (('0'<= key.name) && (key.name <='9') ) {
        let index = Number(key.name);
        if (serialPortsList.length<=index) {
            console.log(`Please select between 0 and ${serialPortsList.length-1}`);
        }
        else {
            openPort(serialPortsList[index]);
        }
    }
    else {
      console.log(`You pressed the "${key.name}" key. Not yet supported`);
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Simulated clock test
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var startTimeInSec = null;
var clockUnit = 60;     // 1 sec --> 1 minutes
function simulatedClock(rxJson) {
    console.log(rxJson);
    
    /* Use the below code for your activity
    if (!("t" in rxJson)) return;
    if (startTimeInSec == null) {
        startTimeInSec = rxJson.t;
    }
    let curTimeInSec = rxJson.t;
    let simTimeInSec = // Your code here //;
    let curTime = new Date(// Your code here //);
    let simulatedTime = new Date(// Your code here //);
    console.log(`simulated: ${simulatedTime.toString()}, actual: ${curTime.toString()}`);
    */
}



