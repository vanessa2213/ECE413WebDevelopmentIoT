//define regex
let re_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
let re_low = /[a-z]/;
let re_up = /[A-Z]/;
let re_digit = /[0-9]/;
//function to create a new account for user
function signup(){
    let txtdata = {
        email: $('.email').val(),
        password: $('.password').val(),
        deviceID: $('.deviceID').val(),
        apiKey: $('.api').val(),
        zip: $('.zip').val()
    };
    console.log(txtdata);
    //no email entered
    if(txtdata.email === ''){
        window.alert("Please enter email");
        return;
    }
    //no password entered
    if(txtdata.password === ''){
        window.alert("Please enter password");
        return;
    }
    //no device ID entered
    if(txtdata.deviceID === ''){
        window.alert("Please enter device ID");
        return;
    }
    //no api key entered
    if(txtdata.apiKey === ''){
        window.alert("Please enter api key");
        return;
    }
    //check if email is in correct format  NEEDS WORK
    /*if(re_email.exec(txtdata.email)){
        window.alert("Please enter vaild email");
    }*/
    //check if password has one lowercase letter
    if(re_low.exec(txtdata.password) == null){
        window.alert("Password must have one lowercase letter");
    }
    //check if password has one uppercase letter
    if(re_up.exec(txtdata.password) == null){
        window.alert("Password must have one uppercase letter");
    }
    //check if password has one uppercase letter
    if(re_digit.exec(txtdata.password) == null){
        window.alert("Password must have one number");
    }

    $.ajax({
        url:'/login/signUp',
        method:'POST',
        contentType: 'application/json',
        data: JSON.stringify(txtdata),
        dataType: 'json'
    })
    //done function
    .done(function(data,textStatus,jqXHR){
        window.location.replace("login.html");
    })
    .fail(function(jqXHR,textStatus,errorThrown){
        if(jqXHR.status = 404){
            window.alert("Error.")
        }
        else{
            alert(jqXHR.status);
            window.alert('fuck');
        }
    });
}
//when button checked perform signup function
$(function(){ 
    $('button').click(signup);
});
