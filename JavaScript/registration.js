//global variable required for some of the input a relic from the
//previous project implementation
var objects = [];
//creates a variable containing an array of all input tag elements
let inputs = document.querySelectorAll("input");
//creates variables that contain all the user required data fields
let fName = "";
let lName = "";
let eAddress = "";
let houseNo = "";
let street = "";
let city = "";
let postcode ="";
let DD = null;
let MM = null;
let YYYY = null;
let password = null;
let confirmPassword = null;
//creates an array filled with default values of false, used to unlock registration button.
let validArray = new Array(10).fill(false);
//creates variables containing html elements required for the registration page.
let rows = document.getElementsByClassName("row");
let button = document.getElementById("register");
let form = document.getElementById('regInputs');
let page = document.getElementById('registrationBox');
//creates error divs for all the required user inputs.
let errorDivFirstName = document.createElement('div');
let errorDivLastName = document.createElement('div');
let errorDivEmailAddress = document.createElement('div');
let errorDivDD = document.createElement('div');
let errorDivMM = document.createElement('div');
let errorDivYYYY = document.createElement('div');
let errorDivPassword = document.createElement('div');
let errorDivConfirmPass = document.createElement('div');
//creates an array containing every error div does not include address fields
let divArray = [errorDivFirstName , errorDivLastName , errorDivEmailAddress ,
     errorDivDD , errorDivMM , errorDivYYYY , errorDivPassword , errorDivConfirmPass ,];
//adds errorDiv class to all error divs used for styling.
for(i = 0; i < divArray.length; i++){
    divArray[i].classList.add("errorDiv");
}
//creates a hash map mapping field to the row it occurs in this is used to position error messages as they occur.
let inputMap = {};
inputMap["firstName"] = rows[0];
inputMap["lastName"] = rows[1];
inputMap["emailAddress"] = rows[2];
inputMap["dobDay"] = rows[3];
inputMap["dobMonth"] = rows[3];
inputMap["dobYear"] = rows[3];
inputMap["password"] = rows[4];
inputMap["confirmPassword"] = rows[5];
;
//function adding 'onchange' listeners to all input elements.
for(i = 0; i < inputs.length; i++){
    let currentInput = inputs[i];
    let validRegx = "";
    let valid = false;
    currentInput.addEventListener('change' , function(){
        //applies different regex based on field id.
        switch(currentInput.name){
            case "firstName":
                //first name regex validation.
                validRegx = new RegExp('^[A-Z a-z]{3,13}$');
                valid = validRegx.test(currentInput.value);
                fName = currentInput.value;
                errorDivFirstName.remove();
                if(valid){
                    validArray[0] = true;
                    renderCheckmark("firstNameCheck" , valid);

                }
                else{
                    //first name error handling.
                    validArray[0] = false;
                    renderCheckmark("firstNameCheck" , valid);
                    if(fName.length <= 2){
                        errorDivFirstName.innerHTML = "First Name is too short";
                    }
                    else if(fName.length > 13){
                        errorDivFirstName.innerHTML = "First Name is too long";
                    }
                    else {
                        errorDivFirstName.innerHTML = "First Name contains invalid characters";
                    }
                    inputMap[currentInput.name].insertAdjacentElement("afterend" , errorDivFirstName);
                }
                break;

            case "lastName":
                //last name regex validation.
                validRegx = new RegExp('^[A-Z a-z]{3,13}$');
                valid = validRegx.test(currentInput.value);
                lName = currentInput.value;
                errorDivLastName.remove();
                if(valid){
                    validArray[1] = true;
                    renderCheckmark("lastNameCheck" , valid);
                }
                else{
                    //last name error handling.
                    validArray[1] = false;
                    renderCheckmark("lastNameCheck" , valid);
                    if(lName.length <= 2){
                        errorDivLastName.innerHTML = "Last Name is too short";
                    }
                    else if(lName.length > 13){
                        errorDivLastName.innerHTML = "Last Name is too long";
                    }
                    else {
                        errorDivLastName.innerHTML = "Last Name contains invalid characters";
                    }
                    inputMap[currentInput.name].insertAdjacentElement("afterend" , errorDivLastName);
                }
                break;
            case "emailAddress":
                //email regex validation.
                validRegx = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
                valid = validRegx.test(currentInput.value);
                eAddress = currentInput.value;
                errorDivEmailAddress.remove();
                //code that checks whether the email the user has submitted already
                //exists in the database
                let matchingEmail = false;
                let request = new XMLHttpRequest();
                let formData = new FormData();
                formData.append("check_email" , eAddress);
                request.open("POST" , "Backend.php" , true);
                request.onload = function(){
                    result = this.responseText;
                    if(result === "match"){
                        matchingEmail = true;
                    }
                    else{
                        matchingEmail = false;
                    }
                }
                request.send(formData);
                if(valid && !matchingEmail){
                    validArray[2] = true;
                    renderCheckmark("emailAddressCheck" , valid);
                }
                else{
                    //email error handling.
                    validArray[2] = false;
                    renderCheckmark("emailAddressCheck" , false);
                    if(matchingEmail){
                        errorDivEmailAddress.innerHTML = "email already registered";
                    }
                    else{
                        errorDivEmailAddress.innerHTML = "Invalid email address";
                    }
                    inputMap[currentInput.name].insertAdjacentElement("afterend" , errorDivEmailAddress);
                }
                break;
                //DOB regex and error handling.
                case "dobDay" :
                    validRegx = new RegExp('^([1-2][0-9]|3[0-1]|0{0,1}[1-9]){1,1}$');
                    valid= validRegx.test(currentInput.value);
                    errorDivDD.remove();
                    if(valid){
                        DD = currentInput.value;
                        validDate();
                    }
                    else{
                        DD = null;
                        validArray[3] = false;
                        errorDivDD.innerHTML = "Incorrenct DD Format entered";
                        inputMap[currentInput.name].insertAdjacentElement("afterend" ,errorDivDD);
                    }
                    break;

                case "dobMonth" :
                    validRegx = new RegExp('^(1[0-2]|0{0,1}[1-9]){1,1}$');
                    valid= validRegx.test(currentInput.value);
                    errorDivMM.remove();
                    if(valid){
                        MM = currentInput.value;
                        validDate();
                    }
                    else{
                        MM = null;
                        validArray[3] = false;
                        errorDivMM.innerHTML = "Incorrenct MM Format entered";
                        inputMap[currentInput.name].insertAdjacentElement("afterend" ,errorDivMM);
                    }
                    break;

                case "dobYear":
                    validRegx = new RegExp('^(19[0-9][0-9]|20[0-1][0-9]){1,1}$');
                    valid= validRegx.test(currentInput.value);
                    errorDivYYYY.remove();
                    if(valid){
                        YYYY = currentInput.value;
                        validDate();
                    }
                    else{
                        YYYY = null;
                        validArray[3] = false;
                        errorDivYYYY.innerHTML = "Incorrenct YYYY Format entered please enter a year between 1900-2019";
                        inputMap[currentInput.name].insertAdjacentElement("afterend" ,errorDivYYYY);
                    }
                    break;
                case "password" :
                    //password regex validation.
                    validRegx = new RegExp('^.*[A-Z]+.*[0-9]+.*|.*[0-9]+.*[A-Z]+.*$');
                    valid= validRegx.test(currentInput.value);
                    password = currentInput.value;
                    errorDivPassword.remove();
                    if(valid && password.length >= 8 ){
                        renderCheckmark("passwordCheck" , valid);
                        validArray[4] = true;
                    }
                    else{
                        //password error handling.
                        validArray[4] = false;
                        renderCheckmark("passwordCheck" , false);
                        if(password.length < 8){
                            errorDivPassword.innerHTML = "password is too short";
                        }
                        else{
                            errorDivPassword.innerHTML = "password is invalid";
                        }
                        inputMap[currentInput.name].insertAdjacentElement("afterend" ,errorDivPassword);
                    }
                    break;

                case "confirmPassword":
                    //checks if passwords match.
                    confirmPassword = currentInput.value;
                    errorDivConfirmPass.remove();
                    if(validArray[4]){
                        if(password == confirmPassword){
                            validArray[5] = true;
                            renderCheckmark("passwordConfirmCheck" , true);
                        }
                        else{
                            //confirm password error handling.
                            validArray[5] = false;
                            renderCheckmark("passwordConfirmCheck" , false);
                            errorDivConfirmPass.innerHTML = "passwords do not match";
                            inputMap[currentInput.name].insertAdjacentElement("afterend" ,errorDivConfirmPass);
                        }
                    }
                    break;
                case "house-number":
                    //Checks only if the value is non empty
                    houseNo = currentInput.value;
                    if(currentInput.value > 0){
                        validArray[6] = true;
                        renderCheckmark("housenoCheck" , true);
                    }
                    else{
                        validArray[6] = false;
                        renderCheckmark("housenoCheck" , false);
                    }
                    break;
                    //checks if street contains only letters 
                case "street":
                    validRegx = new RegExp('^[A-z]+$');
                    valid = validRegx.test(currentInput.value);
                    street = currentInput.value;
                    if(valid){
                        validArray[7] = true;
                        renderCheckmark("streetCheck" , true);
                    }
                    else{
                        validArray[7] = false;
                        renderCheckmark("streetCheck" , false);
                    }
                    break;
                    //checks if city contains only letters
                case "city":
                    validRegx = new RegExp('^[A-z]+$');
                    valid = validRegx.test(currentInput.value);
                    city = currentInput.value;
                    if(valid){
                        validArray[8] = true;
                        renderCheckmark("cityCheck" , true);
                    }
                    else{
                        validArray[8] = false;
                        renderCheckmark("cityCheck" , false);
                    }
                    break;
                case "postcode":
                    postcode = currentInput.value;
                    if(currentInput.value.match(/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i)){
                        validArray[9] = true;
                        renderCheckmark("postcodeCheck" , true);
                    }
                    else{
                        validArray[9] = false;
                        renderCheckmark("postcodeCheck" , false);
                    }                      
        }
        //checks if all fields are valid in order to unlock the register button.
        submitButtonState();
    })
}
//renders checkmarks based on whether the regex passed or failed.
function renderCheckmark(id , validity){
    let checkmark = document.getElementById(id);

    if(validity){
        checkmark.style.backgroundImage = 'url("/Assets/Images/checkmark.svg")';
    }
    else{
        checkmark.style.backgroundImage = 'url("/Assets/Images/errormark.svg")';
    }
}
//function handling leap year errors for date check also renders checkmark if the date is valid.
function validDate(){
    if(DD != null && MM != null && YYYY != null){
        renderCheckmark("dateCheck" , true);
        validArray[3] = true;
        if(YYYY % 4 != 0 && DD == 29 && MM == 2 & YYYY != 1900){
            renderCheckmark("dateCheck" , false);
            validArray[3] = false;
            errorDivDD.innerHTML = "leap year error";
            inputMap["dobDay"].insertAdjacentElement("afterend" ,errorDivDD);
        }
    }
}
//function handling the locking and unlocking the submit button.
function submitButtonState(){
    for(i = 0; i < validArray.length; i++){
        //if all are true unlock the button.
        if(validArray[i]){
            button.style.backgroundColor = "#ff9900";
            button.disabled = false;
        }
        else{
            button.disabled = true;
            button.style.backgroundColor = "grey";
            break;
        }
    }
}
//submit event sends all collected data to the database 
//the use of the submit button functionality prevents input spam
form.addEventListener("click" , submitCustomerToDB);
function submitCustomerToDB(e){
    //e.target.preventDefault();
    let request = new XMLHttpRequest();
    let formData = new FormData();
    request.open("POST" , "Backend.php" , true);
    formData.append("first_name" ,fName);
    formData.append("last_name" , lName);
    formData.append("email_address" , eAddress);
    formData.append("DOB" , [YYYY , MM , DD]);
    formData.append("cus_password" , CryptoJS.SHA256(password));
    formData.append("house" , houseNo);
    formData.append("street" , street);
    formData.append("city" , city);
    formData.append("postcode" , postcode);
    request.open("POST" , "Backend.php" , true);
    request.onload = function(){
    }
    request.send(formData);
}
//disables submit button on load 
submitButtonState();








