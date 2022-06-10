//variables use to update the webkit animation of background scrolling on resize
let myRules = document.styleSheets[0].cssRules;
let keyframes = myRules[0];
//original pixel size of the splashart 
let originalSPlashX = 4166;
let originalSPlashY = 1680;
//updates the animation paramaters by deleting the old ones and creating new ones in their place
function updateAnimationParams() {
   keyframes.deleteRule("from");
   keyframes.deleteRule("to");
   loadInitAnimationSettings();
}
//function used for inital animation configuration and updating on resize
function loadInitAnimationSettings(){
    let height = window.innerHeight;
    let scaleFactor = originalSPlashY / height;
    let updatedWidth = originalSPlashX /scaleFactor;
    let bg = document.getElementById("Background");
    bg.style.backgroundSize = updatedWidth * 2 + "px " + height * 2+ "px";
    keyframes.appendRule("from {background-position: 0px 0px;}");
    keyframes.appendRule("to {background-position: " + -updatedWidth * 2 +"px" + " 0px;}");
}
//specifies background behaviours based on the following events 
window.onload = loadInitAnimationSettings;
window.onresize = updateAnimationParams;
//creates the click listener for the login button 
document.getElementById("submit").addEventListener("click" , LoginHandler);
//function used to clear user input from username and password fields 
function resetFields(){
    username = document.getElementById("Username").value = "";
    password = document.getElementById("Password").value = "";
}

function LoginHandler(e){
    //the target is actually a submit button hence its default action is to submit and refresh this prevents that
    e.preventDefault();
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    let errorMessage ="";
    let errorDiv = document.createElement("div");
    errorDiv.setAttribute("id", "errorDiv");
    let loginForm = document.getElementById("loginForm");
    //Handles errors if there is no input 
    if(username.length == 0 || password.length == 0){
        //removes the error message from previous attempt 
        if(document.getElementById("errorDiv") != null){
            document.getElementById("errorDiv").remove();
        }
        errorMessage = "Fields can't be blank";
        errorDiv.innerHTML = errorMessage;
        loginForm.appendChild(errorDiv);
        document.getElementById("Password").value = "";
        return;
    }
    else{
        if(document.getElementById("errorDiv") != null){
            document.getElementById("errorDiv").remove();
        }
    }
    //hashes password using SHA256 Hashing algorithm so that plain text passes aren't compared 
    let hashPassword = CryptoJS.SHA256(password);
    //Ajax function for logging in
    let request = new XMLHttpRequest();
    //sending data in url as opposed to creating a FormData Object
    request.open("GET" , "Backend.php?username=" + username + "&password=" + hashPassword , true);
    //performs this action on function load
    request.onload = function(){
        let response = this.responseText;
        //error handling if server returns false from username and password comparision 
        if(response === "False"){
            if(document.getElementById("errorDiv") != null){
                document.getElementById("errorDiv").remove();
            }
            errorMessage = "Incorrect username or password";
            errorDiv.innerHTML = errorMessage;
            loginForm.appendChild(errorDiv);
            document.getElementById("Password").value = "";
            return;
        }
        else{
            //if username and pass are correct removes any previous errors 
            if(document.getElementById("errorDiv") != null){
                document.getElementById("errorDiv").remove();
            }
            document.getElementById("Password").value = "";
            //sets the username in session storage so it can be used as an indicator of the user being logged in
            sessionStorage.setItem("userName" , username);
            //redirect based on the path that the server has responded with.
            window.location.href = response;
        }
    }
    request.send();
}
