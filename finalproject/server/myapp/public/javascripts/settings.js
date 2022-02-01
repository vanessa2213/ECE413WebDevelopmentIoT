$(document).ready(function(){ 
    let $token = {
        token: window.localStorage.getItem('token')
    }
    $.ajax({
        url: '/settings',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify($token),
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
        //add name to screen
        if(!data.name){
            $('#name').text('Name: Add Your Name!');
        }
        else{
            $('#name').text('Name: ' + data.name);
        }
        //add zip to screen
        if(!data.zip){
            $('#zip').text('Zipcode: Add your zipcode!');
        }
        else{
            $('#zip').text('Zipcode: '+ data.zip);
        }
        //add email to screen
        $('#email').text('Email: '+ data.email);
        //add list of particle devices
        /*if(!data.devices){
            ('#deviceList').text('Devices: Add a device!');
        }
        else{
            let html = '<p> Devices: <ul>'
        }*/
    });
});
function addName(){
    let $name = {
        name: $('#firstName').val(),
        token: window.localStorage.getItem('token')
    }
    $.ajax({
        url: '/settings/addName',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify($name)
    })
    .done(function (data,textStatus,jqXHR) {
       window.location.reload(true);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        window.alert(errorThrown);
    });
}

function addZip(){
    let $zip = {
        zip:$('#zipcode').val(),
        token: window.localStorage.getItem('token')
    }
    $.ajax({
        url: '/settings/addZipcode',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify($zip),
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
       window.alert($zip + " has be added.");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        window.alert(errorThrown);
    });
}

function addDevice() {
    let deviceData = {
        deviceID: $('#deviceID').val(),
        api: $('#api').val(),
        token: window.localStorage.getItem('token')
    };

    $.ajax({
        url: '/settings/addDevice',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(deviceData),
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
        window.alert("Device added");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        window.alert(errorThrown);
    });
}

function removeDevice() {
    let deviceData = {
        deviceID: $('#deviceIDre').val(),
        token: window.localStorage.getItem('token')
    };

    $.ajax({
        url: '/settings/removeDevice',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(deviceData),
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
        window.alert("Device removed");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        window.alert(errorThrown);
    });
}
function sliderVal(){
    var slider =$(".slider").val();
    var output = $("demo");
    output.text(slider.value);
}

$(function () {
    $('#nameBtn').click(addName);
    $('#zipBtn').click(addZip);
    $('#removeBtn').click(removeDevice);
    $('#deviceBtn').click(addDevice);
    $('slider').on('input',sliderVal);
});
