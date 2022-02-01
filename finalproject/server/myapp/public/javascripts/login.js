//Login to web app
function login() {
    let txdata = {
        email: $('.email').val(),
        password: $('.password').val()
    };

    $.ajax({
        url: '/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(txdata),
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
        console.log(data);
        window.localStorage.setItem("token", data.token);
        window.location.replace("home.html");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        window.alert(errorThrown);
    });
}

$(function () {
    $('#loginBtn').click(login);
});
