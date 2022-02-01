//current time
var cur = Date.now();

var device = {
    id: 'e00fce68b5a5e24e242a9d40',
    token: '4f75d91abd41ef6bf7a86cb9c7e8af3174282c32'
}
//get temperture from dht11
function getTemp(){
    var Url = 'https://api.particle.io/v1/devices/'+ device.id+'/Temp?access_token='+device.token;

    $.ajax({
        url: Url,
        method: 'GET'
    })
    .done(function (data, textStatus, jqXHR) {
        let tempp = JSON.parse(data.result);
        let $data = $('#temp');
        $data = $data.text(tempp.toFixed(1));
        $('<span class = stuff>&#8457;</span>').appendTo($data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
       console.log(" Temp Failure");
    });
}
//get humidity from dht11
function getHum(){
    var Url = 'https://api.particle.io/v1/devices/'+ device.id+'/Hum?access_token='+device.token;

    $.ajax({
        url: Url,
        method: 'GET'
    })
    .done(function (data, textStatus, jqXHR) {
        let hum = JSON.parse(data.result);
        let $data = $('#humidity');
        $data = $data.text(hum.toFixed(0)+'%');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
       console.log("Hum Failure");
    });
}
//get door status
function getDoorStatus(){
    var Url = 'https://api.particle.io/v1/devices/'+ device.id+'/Door?access_token='+device.token;

    $.ajax({
        url: Url,
        method: 'GET'
    })
    .done(function (data, textStatus, jqXHR) {
        let door = JSON.parse(data.result);
        let $data = $('#doorStatus');
        if(door > 2000){
            $data = $data.text('Door is Open');
            $data.css('color', 'red');
        }
        else{
            $data = $data.text('Door is closed');
            $data.css('color', 'green');
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
       console.log(" Door Failure");
    });
}
//calls all functions to current results
function callAPI(){
    getTemp();
    getHum();
    getDoorStatus();
    cur = Date.now();
}
//gets live feed of sensors (temp and door)
function liveFeed(){
    //update every 30 seconds
    window.setInterval(callAPI, 30000);
}

$(function () {
    $('#dht11Btn').click(liveFeed);
});
