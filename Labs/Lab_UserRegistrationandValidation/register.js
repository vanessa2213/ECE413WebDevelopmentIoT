

const fname = document.getElementById("fullName")
const mail = document.getElementById("email");
const pass = document.getElementById("password");
const passC = document.getElementById("passwordConfirm");
const sub = document.getElementById("submit");

const formError = document.getElementById("formErrors");


let err = false;
sub.addEventListener("click", function(event){
    let err = false;
    if(!fname.value)
    {
        formError.style= "display: block";
        fname.style.border = "2px solid red";
        err = true;
        const errFN = document.createElement("li");
        errFN.textContent = "Missing full name.";
        document.getElementById("list").appendChild(errFN)  
    }
    if(!mail.value || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/.test(mail.value))
    {
        formError.style= "display: block";
        mail.style.border = "2px solid red";
        err = true;
        const errEmail = document.createElement("li");
        errEmail.textContent = "Invalid or missing email address.";
        document.getElementById("list").appendChild(errEmail);
    }
    
    if(pass.value.length<10 || pass.value.length>20) //password between 10 and 20 characters
    {
        formError.style= "display: block";
        pass.style.border = "2px solid red";
        err = true;
        const errPassLen = document.createElement("li");
        errPassLen.textContent ="Password must be between 10 and 20 characters.";
        document.getElementById("list").appendChild(errPassLen);
    }
    if(!pass.value || /a-z/.test(pass.value)) 
    {
        formError.style= "display: block";
        pass.style.border = "2px solid red";
        err = true;
        const errPassLowC = document.createElement("li");
        errPassLowC.textContent ="Password must contain at least one lowercase character.";
        document.getElementById("list").appendChild(errPassLowC);

    }
    if(!pass.value || /A-Z/.test(pass.value)) 
    {
        formError.style= "display: block";
        pass.style.border = "2px solid red";
        err = true;
        const errPassUpperC = document.createElement("li");
        errPassUpperC.textContent = "Password must contain at least one uppercase character.";
        document.getElementById("list").appendChild(errPassUpperC);

    }
    if(!pass.value || (/0-9/.test(pass.value))) 
    {
        formError.style= "display: block";
        pass.style.border = "2px solid red";
        err = true;
        const errPassDigit = document.createElement("li");
        errPassDigit.textContent = "Password must contain at least one digit.";
        document.getElementById("list").appendChild(errPassDigit);

    }
    if(passC.valu || pass.value!==passC.value) //password between 10 and 20 characters
    {
        formError.style= "display: block";
        pass.style.border = "2px solid red";
        passC.style.border = "2px solid red";
        err = true;
        const errPassEqual = document.createElement("li");
        errPassEqual.textContent = "Password and confirmation password don't match.";
        document.getElementById("list").appendChild(errPassEqual);

    }
    if(!err){
        formError.style= "display: none";
        fname.style.border = "1px solid #aaa";
        mail.style.border = "1px solid #aaa";
        pass.style.border = "1px solid #aaa";
        passC.style.border = "1px solid #aaa";
    }
    
    
});



/*
            <li id="fullNameWrong">Missing full name.</li>
            <li id="emailWrong">Invalid or missing email address.</li>
            <li id="passwordWrong_len">Password must be between 10 and 20 characters.</li>
            <li id="passwordWrong_lowerchar">Password must contain at least one lowercase character.</li>
            <li id="passwordWrong_uppchar">Password must contain at least one uppercase character.</li>
            <li id="passwordWrong_digit">Password must contain at least one digit.</li>
            <li id="passwordMatch">Password and confirmation password don't match.</li>


*/
        
    
    /*if(!(emailString & pattern.test(emailString))){
        document.getElementById("formErrors").style.setProperty("display", "block");
        document.getElementById("formErrors").style.setProperty("color", "red");
        document.getElementById("formErrors").innerHTML = "Invalid or missing email address"
    }
    //if(!())
    
    else{
        document.getElementById("formErrors").style.setProperty("display", "none");
        document.querySelectorAll(input).style.setProperty("border", "1px solid #aaa");
    }*/
//event.preventDefault();