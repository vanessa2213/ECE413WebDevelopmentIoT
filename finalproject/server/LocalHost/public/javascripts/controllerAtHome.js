var myInterval = null;
var guiUpdated = false;

$(function() {

    serailCmd({ cmd: "scan" });
});


function serailCmd(data) {
    $.ajax({
        url: '/serial/' + data.cmd,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json'
    }).done(serailSuccess).fail(serialFailure);
}

function serailSuccess(data, textStatus, jqXHR) {
    if ("cmd" in data) {
        if (data.cmd === "scan") updateAvailableSerialList(data);
        else if (data.cmd === "open") finishOpenClose(data);
        else if (data.cmd === "close") finishOpenClose(data);

        if (data.cmd === "read") {
            let curStr = $('#rdData').html();
            curStr += JSON.stringify(data.data);
            $('#rdData').html(curStr);
            document.getElementById("rdData").scrollTop = document.getElementById("rdData").scrollHeight;
            // update GUI
            updateGUI(data.data);
        } else {
            $('#cmdStatusData').html(JSON.stringify(data, null, 2));
        }
    }
}

function serialFailure(jqXHR, textStatus, errorThrown) {
    $('#cmdStatusData').html(JSON.stringify(jqXHR, null, 2));
}

function updateAvailableSerialList(data) {
    if ("list" in data) {
        let curList = data.list;
        for (let newPort of curList) {
            $('#com_ports_list').append(`<option value="${newPort}">${newPort}</option>`);
        }
        if (curList.length == 1) {
            $("#com_ports_list option:eq(1)").prop("selected", true);
            connectDisconnect();
        }
    }
}

function connectDisconnect() {
    if ($("#btnConnect").html() == "Connect") {
        let selectedPort = $("#com_ports_list").val();
        if (selectedPort === "null") {
            window.alert("Please select your COM port");
            return;
        }
        serailCmd({ cmd: "open", path: selectedPort });
    } else {
        serailCmd({ cmd: "close" });
    }
}


function updateGUI(data) {
    if (!guiUpdated) {
        if ("Thermostat" in data) {
            if ("T1" in data.Thermostat) $('#system_mode_list').val(data.Thermostat.T1);
            if ("F1" in data.Thermostat) $('#fanonoff').val(data.light.F1).change();
            if ("Temp" in data.Thermostat) $('#current_temp').html = data.Thermostat.Temp + "°F";
            if ("Humid" in data.Thermostat) $('#current_hum').html = data.Thermostat.Humid + "%";
        }
        if ("SmartLight" in data) {
            if ("R" in data.SmartLight) $('#bulb_colorR').html = "R: " + data.SmartLight.R;
            if ("G" in data.SmartLight) $('#bulb_colorG').html = "G: " + data.SmartLight.G;
            if ("B" in data.SmartLight) $('#bulb_colorB').html = "B: " + data.SmartLight.B;
            if ("Brightness" in data.SmartLight) $('bulb_brightness').html = data.SmartLight.Brightness;
        }
        if ("Door" in data) {
            if ("OPEN" in data.Door) $('#door_status').html = "Open";
            else if ("CLOSED" in data.Door) $('#door_status').html = "Close";
        }

        guiUpdated = true;
    }
}

function FanControl(value) {
    let txcmd = {
        cmd: "write",
        data: {
            Fan: { On: value }
        }
    };
    console.log(JSON.stringify(txcmd));
    serailCmd(txcmd);
}

function SystemMode(option, value) {
    let txcmd = {
        cmd: "write",
        data: {
            Thermostat: {}
        }
    };
    txcmd.data.Thermostat[option] = value;

    console.log(JSON.stringify(txcmd));
    serailCmd(txcmd);

}

function DesireTemp() {
    let $temp_set = $("#temp_set");
    let value = $temp_set.val();
    let txcmd = {
        cmd: "write",
        data: {
            Temperature: { set: value }
        }
    };
    console.log(JSON.stringify(txcmd));
    serailCmd(txcmd);
}

function finishOpenClose(data) {
    if ($("#btnConnect").html() == "Connect") {
        $("#btnConnect").html("Disconnect");
        $("#com_status").val(data.msg);
        myInterval = setInterval(function() { serailCmd({ cmd: "read" }); }, 1000);
    } else {
        $("#btnConnect").html("Connect");
        $("#com_status").val(data.msg);
        if (myInterval != null) {
            clearInterval(myInterval);
            myInterval = null;
        }
    }
}