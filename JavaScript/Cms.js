//inner html that creates a new platform element that is later
// called whenever a user calls the function
let platformInnerDiv = "<div class=\"platform-selection-container\">\r\n<div class=\"platform-text\">Platform:<\/div>\r\n<div class=\"vertical-split\">\r\n<div class=\"select-platform\">--Select--<\/div>\r\n<div class=\"drop-down-content\">\r\n<div class=\"first-platform\"><\/div>\r\n<div class=\"second-platform\"><\/div>\r\n<div class=\"third-platform\"><\/div>\r\n<\/div>\r\n<div class=\"index-of-content\">0<\/div>\r\n<div class=\"hidden-indicator\">default<\/div>\r\n<\/div>\r\n<\/div>\r\n<div class=\"quantity\">\r\n<div class=\"quantity-text\">Quantity:<\/div>\r\n<input type=\"text\" class=\"game-quantity\">\r\n<\/div>\r\n<div class=\"close\">X<\/div>";
//global variables for DOM objects
var modalText = document.getElementById("modal-text");
var modal = document.getElementById("modal-box");
var platformRows;
var platformQuantities;
var checkboxes;
var radioESRB;
var descriptionArea;
var modalButtonAddGame;
var modalButtonDeleteGame;
var editProductButton;
var addProductPage;
var indexOfResultArray;
var editVariable = 0;
var gameID = 0;
let id = 1;
//tracks the last active tab on the option sidebar
let lastActive;
//stores the value of the uploaded image file
var file = null;
//holds the return value of search funtionality
var result = null;
let allOptions = document.getElementsByClassName("options");
let allMainTabs = document.getElementsByClassName("main-tabs");
//creates click listeners for pressing the sidebar options 
for(i = 0; i < allOptions.length; i++){
    allOptions[i].addEventListener("click" , activeTab);
}
//function handles the click of each individual sidebar option
function activeTab(e){
    for(i = 0; i < allOptions.length; i++){
        allOptions[i].classList.remove("active");
    }
    for(i = 0; i < allMainTabs.length; i++){
        allMainTabs[i].style.display = "none";
    }
    //handles press on Add Game otion
    if(e.target.innerHTML === "Add Games"){
        resetAddGame();
        addProductPage = document.getElementById("add-product-page");
        addProductPage.style.display = "flex";
    }
    //handles press on Manage Games
    if(e.target.innerHTML === "Manage Games"){
        returnToResults();
    }
    //handles press on Manage Orders
    if(e.target.innerHTML ==="Manage Orders"){
        returnToOrders();
    }
    e.target.classList.add("active");
}
//function sets the first option in the array of options as the active tab
function activateAnalytics(){
    allOptions[0].classList.add("active");
}
//keeps track of the amount of platform divs that exist 
let amountOfPlatforms = 1;
//first loop variable used as the first loop html is hard coded
let firstLoop = true;
//function handles the functionality of the add platform button on the add game page
function addPlatform(){
    if(amountOfPlatforms < 3){
        if(!firstLoop){
            let platform = document.createElement("div");
            platform.classList.add("platforms");
            platform.innerHTML = platformInnerDiv;
            let platforms = document.getElementsByClassName("platforms");
            platforms[amountOfPlatforms -1].parentNode.insertBefore(platform, platforms[amountOfPlatforms -1].nextSibling);
            amountOfPlatforms++;
        }
        firstLoop = false;
        let indexOFContents = document.getElementsByClassName("index-of-content");
        indexOFContents[amountOfPlatforms -1].innerHTML = id++;
        let closeButtons = document.getElementsByClassName("close");
        closeButtons[amountOfPlatforms -1].addEventListener("click" , removePlatform);
        let selectionBox = document.getElementsByClassName("select-platform");
        selectionBox[amountOfPlatforms - 1].addEventListener("click" , displayContent);
        let Ps4 = document.getElementsByClassName("first-platform");
        let Xbone = document.getElementsByClassName("second-platform");
        let Switch = document.getElementsByClassName("third-platform");
        //adds event listiners for each of the platforms allowing them to be selected from the dropdown menu
        Ps4[amountOfPlatforms - 1].addEventListener("click" , selectPlatfrom);
        Xbone[amountOfPlatforms - 1].addEventListener("click" , selectPlatfrom);
        Switch[amountOfPlatforms - 1].addEventListener("click" , selectPlatfrom);
    }
}
//function handles platform selection when clicking on any of the platforms in the dropdown menu 
function selectPlatfrom(e){
    let parent = e.target.parentNode;
    let hiddenIndicator = parent.nextElementSibling.nextElementSibling;
    let selectPlatfromVisual = parent.previousElementSibling;
    if(e.target.classList.contains("first-platform")){
        hiddenIndicator.innerHTML = "PS4";
        selectPlatfromVisual.innerHTML = "";
        selectPlatfromVisual.className ="select-platform first-platform" ;
    }
    else if(e.target.classList.contains("second-platform")){
        hiddenIndicator.innerHTML = "XBONE";
        selectPlatfromVisual.innerHTML = "";
        selectPlatfromVisual.className = "select-platform second-platform";
    }
    else if(e.target.classList.contains("third-platform")){
        hiddenIndicator.innerHTML = "SWITCH";
        selectPlatfromVisual.innerHTML = "";
        selectPlatfromVisual.className = "select-platform third-platform";
    }
}
//gets an array of all the x (close buttons) on the platfrom selection divs
let closes = document.getElementsByClassName("close");
//removes the x from the first element preventing the first div from being deleted
closes[0].style.visibility = "hidden";
//function handles removing a platform via the x button
function removePlatform(e){
    e.target.parentNode.remove();
    amountOfPlatforms--;
}
//variable used to store the add more platforms button
let addPlatformButton = document.getElementById("add-more-platforms");
//variables tracks whether the drop down menu is visible or not 
let hiddenActive = 0;
//function used to display or hide the dropdown content based on click on the select div
function displayContent(e){
    //prevents the click from bubbling to the parent class
    e.stopPropagation();
    //action performed when the dropdown is invisible 
    if(hiddenActive == 0){
        e.target.nextElementSibling.style.display = "block";
        hiddenActive++;
        lastActive = e.target.nextElementSibling.nextElementSibling.innerHTML;
    }
    //action performed when the dropdown is visible 
    else if(hiddenActive == 1){
        let content = document.getElementsByClassName("drop-down-content");
        for(i = 0; i < content.length; i++){
            content[i].style.display = "none";
        }
        hiddenActive = 0;
        //last active is the last active dropdown this is used to prevent multiple dropdown menus from existing simutainously 
        if(e.target.nextElementSibling.nextElementSibling.innerHTML != lastActive){
            e.target.nextElementSibling.style.display = "block";
            hiddenActive++;
            lastActive = e.target.nextElementSibling.nextElementSibling.innerHTML;
        }
    }
}
//while dropdown is visilble clicking off of it anywhere on the window makes it dissapear
window.addEventListener("click" , function(){
    let content = document.getElementsByClassName("drop-down-content");
    for(i = 0; i < content.length; i++){
        content[i].style.display = "none";
        hiddenActive = 0;
    }
});
//functions responsible for drag and drop events 
let dragTarget = document.getElementById("drag-target");
dragTarget.addEventListener("dragenter" , function(e){
    preventDefaults(e);
    displayHighlight();
});
dragTarget.addEventListener("dragover" , function(e){
    preventDefaults(e);
    displayHighlight();
});
dragTarget.addEventListener("dragleave" , function(e){
    preventDefaults(e);
    removeHighlight();
});
dragTarget.addEventListener("drop" , function(e){
    preventDefaults(e);
    removeHighlight();
    dropImage(e);
});
//function used to prevent default behaviours in the drag and drop action
function preventDefaults(e){
    e.preventDefault();
    e.stopPropagation();
}
//function adds a highlight when an item is dragged over the div
function displayHighlight(){
    dragTarget.classList.add("high-light");
}
//removes highlight on drag leave
function removeHighlight(){
    dragTarget.classList.remove("high-light");
}
//captures dropped image into a file and call a function that displays its preview
function dropImage(e) {
    let data = e.dataTransfer;
    file = data.files;
    previewFile(file);
  }
  //previews dropped image
  function previewFile(file){
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = function(){
        let image = document.createElement('img');
        image.src = reader.result;
        image.classList.add("loaded-image");
        dragTarget.style.display = "none";
        let previewImage = document.getElementById("preview-image");
        previewImage.innerHTML = "";
        previewImage.appendChild(image);
        let previewContainer = document.getElementById("preview-container");
        previewContainer.style.display = "block";   
    }
  }
  //removes the previewed image and sets the value of file to null this is used when wanting to remove or change the image
  function removePreview(){
    let previewContainer = document.getElementById("preview-container");
    file = null;
    previewContainer.style.display = "none";
    dragTarget.style.display = "block";
  }
//variable stores the div containing the x button on the preview image 
let previewContainerX = document.getElementById("delete-preview-image");
//creates an event listiner on the above button to remove the preview
previewContainerX.addEventListener("click" , removePreview);
//function responsible fo submission of user input to backend + database
function collectAndSubmit(){
    //clears all errors from previous submission attempt
    let rows = document.getElementsByClassName("rows");
    for(i = 0; i < rows.length; i++){
        rows[i].classList.remove("errorClass");
    }
    //variables stores a boolean which changes if the results are not valid
    let allVaildInputs = true;
    //handle data from first row game title
    let gameTitle = document.getElementById("game-title").value;
    //checks if game title length is 0 if it is then the user made no attempt input data
    if(gameTitle.length == 0){
        let firstRow = document.getElementById("first-row");
        firstRow.classList.add("errorClass");
        allVaildInputs = false;
    }
    //handles data from second row game price
    let gamePrice = document.getElementById("game-price").value;
    //regex that is meant to match user input to either a string or an integer
    let gamePriceRegex = new RegExp("^([0-9]+|[0-9]+\.{1}[0-9]+)$");
    //displays error if the match against regex fails 
    if(!(gamePriceRegex.test(gamePrice))){
        let secondRow = document.getElementById("second-row");
        secondRow.classList.add("errorClass");
        allVaildInputs = false;
    }
    //handles platfrom input data 
    platformRows = document.getElementsByClassName("hidden-indicator");
    //qunatities of selected platforms 
    platformQuantities = document.getElementsByClassName("game-quantity");
    //hold key value pairs of platform , quantity
    let qtys = Array();
    //loads array of platform and quantities 
    for(i = 0; i < platformRows.length; i++){
        qtys[i] = [platformRows[i].innerHTML , platformQuantities[i].value];
    }
    //error checking makes sure that quantites are integers and that the platfrom is left on the default selection
    for(i = 0; i < qtys.length; i++){
        var validInputs = true;
        let quantityRegex = new RegExp("^([0-9]+)$");
        //special case quantity of 0 which would normally pass however i don't want products with no stock submitted to the database
        if(qtys[i][1] == 0){
            validInputs = false;
        }
        if(qtys[i][0] === "default" || !quantityRegex.test(qtys[i][1])){
            validInputs = false;
        }
    }
    //displays error in the form a red outline on the div if the bool variable is false
    if(!validInputs){
        let thirdRow = document.getElementById("third-row");
        thirdRow.classList.add("errorClass");
        allVaildInputs = false;
    }
    //handles data from the checkboxes 
    checkboxes = document.getElementsByClassName("checkbox");
    //array of strings used to store selected genres
    let selectedGenres = Array();
    //checks all boxes and pushes ones with val 'checked' to the array
    for(i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            selectedGenres.push(checkboxes[i].value);
        }
    }
    //if the array of genres is empty that means that user made no selection therefore display error
    if(selectedGenres.length == 0){
        let fourthRow = document.getElementById("fourth-row");
        fourthRow.classList.add("errorClass");
        allVaildInputs = false;
    }

    //handles the radio button data
    radioESRB = document.getElementsByClassName("radio-esrb");
    //variable stores the selected ESRB rating
    let selectedESRB = "";
    //check array of radio inputs for the one with val 'checked'
    for(i = 0; i < radioESRB.length; i++){
        if(radioESRB[i].checked){
            selectedESRB = radioESRB[i].value;
            break;
        }
    }
    //handles the description of the game field 
    descriptionArea = document.getElementById("game-description");
    //displays an error if the description length is less than 100 chars 
    if(descriptionArea.value.length < 100){
        let sixthRow = document.getElementById("sixth-row");
        sixthRow.classList.add("errorClass");
        allVaildInputs = false;
    }
    //handles the drag and drop image input if file is null then there is no image dragged in and displays an error
    if(file === null){
        let seventhRow = document.getElementById("seventh-row");
        seventhRow.classList.add("errorClass");
        allVaildInputs = false;
    }
    //handles item creation via submission to db with ajax
    if(allVaildInputs && editVariable == 0){
        const request = new XMLHttpRequest();
        const formData = new FormData();
        //formdata simulates form submission programatically 
        formData.append("game-title" , gameTitle);
        formData.append("game-price" , gamePrice);
        formData.append("platforms" , qtys);
        formData.append("genres" , selectedGenres);
        formData.append("esrb" , selectedESRB);
        formData.append("image[]" , file[0] , gameTitle + ".jpg");
        formData.append("description" , descriptionArea.value);
        //opens a post request
        request.open("POST" , "Backend.php" , true);
        //actions performed on ajax request returning 
        request.onload = function(){
            let response = this.responseText;
            if(response === "success"){
                //code creates and displays a confirmation of submission modal
                modal.style.display = "block";
                modalButtonAddGame = document.getElementById("modal-button-addGame");
                modalButtonAddGame.style.display = "flex";
                modalButtonAddGame.addEventListener("click" , resetAddGameWithModal);
            }
        }
        request.send(formData);
    }
    //handles editting of an existing product
    else if(allVaildInputs && editVariable == 1){
        const request = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("u_id" , gameID);
        formData.append("u-game-title" , gameTitle);
        formData.append("u-game-price" , gamePrice);
        formData.append("u-platforms" , qtys);
        formData.append("u-genres" , selectedGenres);
        formData.append("u-esrb" , selectedESRB);
        formData.append("image[]" , file[0] , gameTitle + ".jpg");
        formData.append("u-description" , descriptionArea.value);
        //post request sent to the backend 
        request.open("POST" , "Backend.php" , true);
        request.onload = function(){
            let response = this.responseText;
            if(response === "success"){
                //on succesfull edit will return to the search results 
                HideAllDivs();
                document.getElementById("search-button").click();
                returnToResults();
                document.getElementById("detailed-product-image").style.backgroundImage = "none";
            }
        }
        request.send(formData);
    }
}
//variable storing the search button div 
let searchInput = document.getElementById("search-button");
//adds click listener to the search buttin div
searchInput.addEventListener("click" , handleSearch);
//function gets the selected regex items from the server an displays them as tabs
function handleSearch(e){
    let searchValue = document.getElementById("search-input").value;
    //if the search bar is empty then the program does nothing and returns
    if(searchValue.length == 0){
        return;
    }
    else{
        //begining of ajax
        const request = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("search" , searchValue);
        request.open("POST" , "Backend.php" , true);
        
        request.onload = function(){
            let response = this.responseText;
            //access all item properties from here.
            //parses the array so that it can be accesed using . operators
            result = JSON.parse(response);
            //stores the div which stores results of the search
            let searchResultsDiv = document.getElementById("search-results");
            //resets the search values left over from a previous search
            searchResultsDiv.style.display = "none";
            searchResultsDiv.innerHTML ="";
            //iterates over each item returned by the search
            for(i = 0; i < result.length; i++){ 
                //encapsulating div holding all values in the entry
                let searchEntry = document.createElement("div");
                searchEntry.classList.add("game-entry");
                let thumbnailEntry = document.createElement("div");
                thumbnailEntry.classList.add("display-game-thumbnail");
                let displayGameTitle = document.createElement("div");
                displayGameTitle.classList.add("display-game-title");
                let displayPlatforms = document.createElement("div");
                displayPlatforms.classList.add("display-platform");
                //outputs images based on the object platform
                for(j = 0; j < result[i].platforms.length; j++){
                    let activePlatform = document.createElement("div");
                    activePlatform.classList.add("active-platform");
                    if(result[i].platforms[j].platform === "PS4"){
                        activePlatform.style.backgroundImage = "url(\"/Assets/Images/ps4Square.svg\")";
                    }
                    if(result[i].platforms[j].platform === "XBONE"){
                        activePlatform.style.backgroundImage = "url(\"/Assets/Images/xboneSquare.svg\")";
                    }
                    if(result[i].platforms[j].platform === "SWITCH"){
                        activePlatform.style.backgroundImage = "url(\"/Assets/Images/switchSquare.svg\")";
                    }
                    displayPlatforms.appendChild(activePlatform);
                }
                //sets the value of game title
                displayGameTitle.innerHTML = result[i].title;
                //sets the value of game price
                let displayGamePrice = document.createElement("div");
                displayGamePrice.classList.add("display-game-price");
                displayGamePrice.innerHTML = "£" + result[i].price;
                thumbnailEntry.style.backgroundImage = "url(\'" + result[i].thumbnail_link  + "\')";
                let hiddenIndexProducts = document.createElement("div");
                hiddenIndexProducts.classList.add("hidden-index-product");
                hiddenIndexProducts.innerHTML = i;
                //creates the parent child structure of the item entries
                searchEntry.appendChild(hiddenIndexProducts);
                searchEntry.appendChild(thumbnailEntry);
                searchEntry.appendChild(displayPlatforms);
                searchEntry.appendChild(displayGameTitle);
                searchEntry.appendChild(displayGamePrice);
                //click listener so that search tabs are clickable 
                searchEntry.addEventListener("click" , displayContentPage);
                searchResultsDiv.appendChild(searchEntry);
            }
            searchResultsDiv.style.display = "flex";
        }
        request.send(formData);
    }
}
//function responsible for displaying the content
function displayContentPage(e){
    let displayedGenres = document.getElementById("genres-container");
    //resets genres from previous button press
    displayedGenres.innerHTML = "";
    if(e.target.classList.contains("game-entry")){
         indexOfResultArray = e.target.firstChild.innerHTML;
    }
    else if(e.target.classList.contains("active-platform")){
         indexOfResultArray = e.target.parentNode.parentNode.firstChild.innerHTML;
    }
    else{
         indexOfResultArray = e.target.parentNode.firstChild.innerHTML;
    }
    //handles return to search click
    let returnToSearch = document.getElementById("return-to-search-button");
    returnToSearch.addEventListener("click" , returnToResults);
    //updates title on the preview content page
    let detailProductTitle = document.getElementById("detail-product-title");
    detailProductTitle.innerHTML = result[indexOfResultArray].title;
    //updates thumbnail image
    let detailedProductImage = document.getElementById("detailed-product-image");
    detailedProductImage.style.backgroundImage = "url(\'" + result[indexOfResultArray].thumbnail_link  + "\')";
    //handles displaying platform 
    for(i = 0; i < result[indexOfResultArray].platforms.length; i++){
        let platformDiv = document.createElement("div");
        let quantityDiv = document.createElement("div");
        platformDiv.classList.add("individual-detailed-platform");
        quantityDiv.classList.add("individual-detailed-quantity");

        if(result[indexOfResultArray].platforms[i].platform === "PS4"){
            platformDiv.innerHTML = "PS4";
            platformDiv.style.backgroundColor = "#003087";
        }
        if(result[indexOfResultArray].platforms[i].platform === "XBONE"){
            platformDiv.innerHTML = "XBONE";
            platformDiv.style.backgroundColor = "#107C10";
        }
        if(result[indexOfResultArray].platforms[i].platform === "SWITCH"){
            platformDiv.innerHTML = "SWITCH";
            platformDiv.style.backgroundColor = "#E70009";
        }
        //displays quantity and platform 
        quantityDiv.innerHTML = result[indexOfResultArray].platforms[i].quantity;
        let detailedQuantity = document.getElementById("detailed-quantity");
        let detailedPlatform = document.getElementById("detailed-platforms");
        detailedQuantity.appendChild(quantityDiv);
        detailedPlatform.appendChild(platformDiv);
    }
    //updates esrb image based on the below hash
    let esrbImage = document.getElementById("ESRB-image");
    let Hashmap = new Map([
        ["E" , "/Assets/Images/Erating.png"] ,
        ["E10" , "/Assets/Images/E10rating.png"] ,
        ["T" , "/Assets/Images/Trating.png"] ,
        ["M" , "/Assets/Images/Mrating.png"] ,
        ["AO" , "/Assets/Images/AOrating.png"]
    ]);
    //sets the esrb image based on the above hash table 
    esrbImage.style.backgroundImage = "url(\'" + Hashmap.get(result[indexOfResultArray].esrb_rating)  + "\')";
    //updates displayed price
    document.getElementById("numeric-price").innerHTML = "£" + result[indexOfResultArray].price;
    //displays genres 
    for(i = 0; i < result[indexOfResultArray].genres.length; i++){
        let genre = document.createElement("div");
        genre.classList.add("genres-list");
        genre.innerHTML = result[indexOfResultArray].genres[i];
        displayedGenres.appendChild(genre);
    }
    //handles description by fetching from database
    let descriptionDisplay = document.getElementById
    ("detailed-description-text");
    const filePath = result[indexOfResultArray].description_link;
    fetch(filePath)
        .then( r => r.text())
        .then( t => descriptionDisplay.innerHTML = t)
    //once all data is loaded into html display the page via its style 
    var contentPreviewPage = document.getElementById("detailed-product-page");
    contentPreviewPage.style.display = "flex";
    //hides the search results page;
    document.getElementById("view-product-page").style.display = "none";
}
//handles the creation of the delete order and edit order button
let deleteButton = document.getElementById("delete-product-button");
deleteButton.addEventListener("click" , sendDeleteRequest);
editProductButton = document.getElementById("edit-product-button");
editProductButton.addEventListener("click" , editHandler);
//function responsible for deleting orders
async function deleteOrder(orderObj){
    let orderIDForm = new FormData();
    orderIDForm.append("order_id" , orderObj._id.$oid);
    let response = await asyncAwaitXhrRequest("POST" , "Backend.php" , orderIDForm);
    if(response === "success"){
        //on success it returns to orders tab and clicks the pending button which will refresh the ordertabs thus disaplaying that the order has been deleted
        returnToOrders();
        document.getElementById("pending").click();
    }
}
//function handles editing an existing product
function editHandler(){
    let index = indexOfResultArray;
    addProductPage = document.getElementById("add-product-page");
    let detailedProductPage = document.getElementById("detailed-product-page");
    detailedProductPage.style.display = "none";
    addProductPage.style.display = "flex";
    //load object data into the edit field
    let gameTitle = document.getElementById("game-title");
    gameTitle.value = result[index].title;
    //load price data of the object into the edit field 
    let gamePrice = document.getElementById("game-price");
    gamePrice.value = result[index].price;
    //adds platform divs first before populating them 
    for(i = 0; i < result[index].platforms.length; i++){
        if(i != 0){
            addPlatform();
        }
        let platformName = document.getElementsByClassName("select-platform")[i];
        let gameQuantity = document.getElementsByClassName("game-quantity")[i];
        let indexOfContent = document.getElementsByClassName("index-of-content")[i];
        let hiddenIndicator = document.getElementsByClassName("hidden-indicator")[i];
        platformName.innerHTML = "";
        if(result[index].platforms[i].platform === "PS4"){
            platformName.classList.add("first-platform");
            hiddenIndicator.innerHTML = "PS4";
        }
        if(result[index].platforms[i].platform === "XBONE"){
            platformName.classList.add("second-platform");
            hiddenIndicator.innerHTML = "XBONE";
        }
        if(result[index].platforms[i].platform === "SWITCH"){
            platformName.classList.add("third-platform");
            hiddenIndicator.innerHTML = "SWITCH";
        }
        gameQuantity.value = result[index].platforms[i].quantity;
        indexOfContent.innerHTML = i -1;
    }
    //loads values of the checkboxes back into their respective divs
    let checkbox = document.getElementsByClassName("checkbox");
    for(i = 0; i < checkbox.length; i++){
        for(j = 0; j < result[index].genres.length; j++){
            if(checkbox[i].value === result[index].genres[j]){
                checkbox[i].checked = true;
            }
        }
    }
    //loads esrb radio box selection
    let esrbCheckBoxes = document.getElementsByClassName("radio-esrb");
    for(i = 0; i < esrbCheckBoxes.length; i++){
        if(result[index].esrb_rating === esrbCheckBoxes[i].value){
            esrbCheckBoxes[i].checked =true;
        }
    }
    //reads saved description from filepath
    let gameDescription = document.getElementById("game-description");
    const filePath = result[index].description_link;
    fetch(filePath)
        .then( r => r.text())
        .then( t => gameDescription.value = t)
    //creates a new blob from path via ajax request doing this as my preview file function requires a file/blob object
    let blob = null;
    let request = new XMLHttpRequest();
    request.open("GET", result[index].thumbnail_link);
    request.responseType = "blob";
    request.onload = function(){
    blob = request.response;
    blob.lastModifiedDate = new Date();
    blob.name = result[index].title;
    let fileArray = new Array();
    fileArray[0] = blob;
    file = fileArray;
    previewFile(file);
    }
    request.send();
    //hides the usual submit button from the page for the duration of product edition
    document.getElementById("submit-product").style.display = "none";
    //displays the edit and exit buttons at the bottom of the page instead
    let editButtonContainer = document.getElementById("edit-button-container");
    editButtonContainer.style.display = "flex";
    //variable storing the edit button
    let editSaveButton = document.getElementById("edit-and-save-button");
    //variable keeping track of whether the page is in creation mode or edit mode
    editVariable = 1;
    gameID = result[index]._id.$oid;
    //functionality for the edit save button will use the same function as submit however the edit var will cause it to take a different track 
    editSaveButton.addEventListener("click" , collectAndSubmit);
    //handles user not wanting to save the changes and exiting immiediatly 
    let dontSaveButton = document.getElementById("exit-without-changing");
    dontSaveButton.addEventListener("click" , returnToResults);
}
//function hides the detailed product page and displays order tabs 
function returnToResults(){
   HideAllDivs();
   resetAddGame();
    document.getElementById("view-product-page").style.display = "flex";
}
//function used on the detailed order page on the delete button to remove a game from the database 
function sendDeleteRequest(){
    index = indexOfResultArray;
    const request = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("id" , result[index]._id.$oid);
    request.open("POST" , "Backend.php" ,true);
    request.onload = function(){
        let response = this.responseText;
        if(response === "OK"){
            //on succesfull delete will display a confirmation modal with the Game Deleted Succesfully message 
           document.getElementById("search-results").innerHTML = "";
           modal.style.display = "flex";
           modalText.innerHTML = "Game Deleted Succesfully";
           modalButtonDeleteGame = document.getElementById("modal-button-deleteGame");
           modalButtonDeleteGame.style.display = "flex";
           modalButtonDeleteGame.addEventListener("click" , function(){
               modal.style.display ="none";
               modalButtonDeleteGame.style.display="none";
               document.getElementById("search-button").click();
               returnToResults();
           });
        }
    }
    request.send(formData); 
}
//function hides all divs that are the children of the content node 
function HideAllDivs(){
    let contentNodes = document.getElementById("content").childNodes;
    for(i = 0; i < contentNodes.length; i++){
        if(contentNodes[i].nodeType == Node.ELEMENT_NODE){
            contentNodes[i].style.display = "none";
        }
    }
}
//function resets the fields on the add game page returning them to null values
function resetAddGame(){
    HideAllDivs();
    editVariable = 0;
    document.getElementById("submit-product").style.display = "block";
    document.getElementById("edit-button-container").style.display = "none";
    let resetTitle = document.getElementById("game-title");
    let resetPrice = document.getElementById("game-price");
    modalText.innerHTML = "Game Added Succesfully";
    //resets title and price 
    resetTitle.value = "";
    resetPrice.value = "";
    //asigns the global vars to html elements 
    platformRows = document.getElementsByClassName("hidden-indicator");
    platformQuantities = document.getElementsByClassName("game-quantity");
    checkboxes = document.getElementsByClassName("checkbox");
    radioESRB = document.getElementsByClassName("radio-esrb");
    descriptionArea = document.getElementById("game-description");
    //resets platform rows 
    for(i = 0; i < platformRows.length; i++){
        let platformDropdows = document.getElementsByClassName("select-platform");
        platformDropdows[i].className = "select-platform";
        platformDropdows[i].innerHTML = "--Select--";
        platformQuantities[i].value = "";
    }
    //resets checkboxes 
    for(i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            checkboxes[i].checked = false;
        }
    }
    for(i = 0; i < radioESRB.length; i++){
        if(radioESRB[i].checked){
            radioESRB[i].checked = false;
            radioESRB[0].checked = true;
            break;
        }
    }
    //removes description and image 
    descriptionArea.value = "";
    removePreview();
    document.getElementById("detailed-platforms").innerHTML = "<div id=\"detailed-platform-text\" class=\"individual-detailed-platform\">Platform<\/div>";
    document.getElementById("detailed-quantity").innerHTML = "<div id=\"detailed-quantity-text\"class=\"individual-detailed-quantity\">Quantity<\/div>";
}
//resets the field values of add game page when the modal confirmation button is pressed
function resetAddGameWithModal(){
    modalText.innerHTML = "Game Added Succesfully";
    resetAddGame();
    modal.style.display = "none";
    modalButtonAddGame.style.display ="none";
    addProductPage = document.getElementById("add-product-page");
    addProductPage.style.display = "flex";
}
//function in charge of creating synchronous ajax requests by returning promises
function asyncAwaitXhrRequest(method , url , formData){
    return new Promise(function (resolve , reject){
        let request = new XMLHttpRequest();
        request.open(method , url , true);
        request.setRequestHeader("Accept" , "application/json , text/plain");
        request.onload = function(){
            if(this.status >= 200 && this.status < 300){
                resolve(request.responseText);
            }
            else{
                reject({status: this.status});
            }
        }
        request.send(formData);
    });
}
//variable stores order tabs array 
var orderTabs = document.getElementsByClassName("order-tabs");
//adds click listeners that will redirect to a detailed order page
for(i = 0; i < orderTabs.length; i++){
    orderTabs[i].addEventListener("click" , loadDefaultOrders);
}
//function loads the basic order data into the html
 async function loadDefaultOrders(e){
     //resets possible previous call to display these
    displayOrderTabs.innerHTML = "";
    for(i = 0; i < orderTabs.length; i++){
        orderTabs[i].className = "order-tabs";
    }
    //relic code left over from when there were 3 possible order tabs 
    //deleted , pending , completed time constrains left only pending
    e.target.classList.add("activeOrder");
    let pendingOrders = document.getElementById("pending");
    let orderType ="";
    if(pendingOrders.classList.contains("activeOrder")){
        orderType = "pending";
    }
    //formdata used to send ordertype to the database 
    let formData = new FormData();
    formData.append("status" , orderType);
    //await call waits for the result of the ajax request before continuing execution
    let ordersArray = await asyncAwaitXhrRequest("POST" , "Backend.php" , formData);
    ordersArray = JSON.parse(ordersArray);
    //creates containing divs and their content for all the order tabs
    for(i = 0; i < ordersArray.length; i++){
        let orderID = document.createElement("div");
        orderID.classList.add("orderID");
        orderID.innerHTML = "Order ID:" + ordersArray[i].order_ID;
        //order total/date
        let orderTotal = document.createElement("div");
        orderTotal.classList.add("order-total");
        orderTotal.innerHTML = "Order Date:" + ordersArray[i].order_date;
        //order index helps getting the right order that is pressed in the detailed page 
        let orderIndex = document.createElement("div");
        orderIndex.classList.add("orderIndex");
        orderIndex.innerHTML = i;
        let orderContainer = document.createElement("div");
        orderContainer.classList.add("order-container");
        //adds structure to the order div
        orderContainer.appendChild(orderIndex);
        orderContainer.appendChild(orderID);
        orderContainer.appendChild(orderTotal);
        //adds a click listener to the tabs allowing them to be clicked and for them to display order details 
        orderContainer.addEventListener("click" , function(e){
            populateOrderPage( e , ordersArray);
        });
        displayOrderTabs.appendChild(orderContainer);
        }
}
//global variable for order placed date used to populate the view order page
var orderDateDiv = document.getElementById("order-date");
//global variable used to populate order id on the view order page
var orderIdDiv = document.getElementById("order-id");
//golbal variable used to populate order status on the view order page
var orderStatusDiv = document.getElementById("order-status");
//golbal variable used to populate total price on the view order page
var totalPriceDiv = document.getElementById("total-price");
//global var used to populate shipping address 
var shippingClass = document.getElementsByClassName("shipping-line");
var orderItemContainer = document.getElementById("item-container");
//return to Orders event handler
let returnToOrderButton = document.getElementById("return-to-orders-page");
returnToOrderButton.addEventListener("click" , returnToOrders);
//function returns to order Tabs
function returnToOrders(){
    HideAllDivs();
    document.getElementById("orders").style.display = "block";
    document.getElementById("item-container").innerHTML = "<div id=\"item-table-headers\">\r\n<div id=\"item-header\">Item<\/div>\r\n<div id=\"platform-header\">Platform<\/div>\r\n<div id=\"quantity-header\">Qty<\/div>\r\n<div id=\"subtotal-header\">Subtotal<\/div>\r\n<\/div>";
}
//populates the order with basic information such as total price , order number
function populateOrderPage(e , orders){
    let ordersArray = orders;
    //hides the previous orders tab page
    document.getElementById("orders").style.display = "none";
    //displays detailed order page
    document.getElementById("detailed-order-page").style.display = "flex";
    //Index of order tabs defaults to 0
    let indexOfOrderEntries = 0;
    //current clicked element 
    let node = e.target;
    //iterates backwards through all previous siblings thus calculating the index of the current element.
    while((node = node.previousElementSibling) != null ){
        indexOfOrderEntries++;
    } 
    //stores the details from the retrieved order array
    let activeOrder = ordersArray[indexOfOrderEntries];
    //populates the divs with relevant information
    orderDateDiv.innerHTML = activeOrder.order_date;
    orderIdDiv.innerHTML = activeOrder.order_ID;
    orderStatusDiv.innerHTML = activeOrder.status;
    totalPriceDiv.innerHTML = "£" + activeOrder.total_price;
    let deleteOrderButton = document.getElementById("delete-order");
    deleteOrderButton.addEventListener("click" , function(){
        deleteOrder(activeOrder);
    });
    populateShipping(activeOrder);
}
//function populates game items in the detailed order page
async function populateItems(orderObj){
    //variable used to store the ids string to be later submitted to the server
    let gameList ="";
    for(i =0; i < orderObj.items.length; i++){
        gameList += orderObj.items[i].gameID + " ";
    }
    //ajax call to retrieve game objects from the order
    let formData = new FormData();
    formData.append("gameIDs" , gameList);
    let result  = await asyncAwaitXhrRequest("POST" , "Backend.php" , formData);
    result = JSON.parse(result);
    //create an order entry div
    for(i = 0; result.length; i++){
        let itemEntry = document.createElement("div");
        itemEntry.classList.add("item-entry");
        let itemImageAndTitle = document.createElement("div");
        itemImageAndTitle.classList.add("image-and-title");
        let itemImage = document.createElement("div");
        itemImage.classList.add("order-image")
        itemImage.style.backgroundImage = "url(\'" +
        result[i].thumbnail_link + "\')";
        let itemTitle = document.createElement("div");
        itemTitle.classList.add("order-game-title")
        itemTitle.innerHTML = result[i].title;
        let itemPlatform = document.createElement("div");
        itemPlatform.classList.add("order-platform");
        itemPlatform.innerHTML = orderObj.items[i].platform;
        let itemQuantity = document.createElement("div");
        itemQuantity.classList.add("order-qty");
        itemQuantity.innerHTML = orderObj.items[i].quantity;
        let itemSubtotal = document.createElement("div");
        itemSubtotal.classList.add("order-subtotal");
        itemSubtotal.innerHTML = result[i].price * itemQuantity.innerHTML;
        itemEntry.appendChild(itemImageAndTitle);
        itemImageAndTitle.appendChild(itemImage);
        itemImageAndTitle.appendChild(itemTitle);
        itemEntry.append(itemPlatform);
        itemEntry.append(itemQuantity);
        itemEntry.appendChild(itemSubtotal);
        document.getElementById("item-container").appendChild(itemEntry);
    }
}
//function redirects the user back to login if session storage is empty otherwise
//the name in session storage is used to update the name on the website topbar
function updateEmployeeName(){
    if(sessionStorage.getItem("userName") === null){
        window.location.replace("index.php");
    }
    else{
        document.getElementById("employee-id").innerHTML = sessionStorage.getItem("userName");
    }
}
//function clears session storage and redirects user to the login page
function facilitateLogout(){
    window.location.replace("index.php");
    sessionStorage.clear();
}
//logout button functionality 
document.getElementById("logout-button").addEventListener("click" , facilitateLogout);
//function used to populate detailed order shipping by retrieving the customer from the database
function populateShipping(orderObj){
    let request = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("userID" , orderObj.customer);
    request.open("POST" , "Backend.php" , true);
    request.onload = function(){
        let customer = JSON.parse(this.responseText)[0];
        shippingClass[0].innerHTML = customer.first_name + " " + customer.last_name;
        shippingClass[1].innerHTML = customer.address.house_number + " " + customer.address.street;
        shippingClass[2].innerHTML = customer.address.city;
        shippingClass[3].innerHTML = customer.address.postcode;
    }
    request.send(formData);
    populateItems(orderObj);
}
var displayOrderTabs = document.getElementById("display-order-tabs");
//clicks the pending/Orders button to get them to redisplay with the updated data
document.getElementById("pending").click();
//functions and event handlers responsible for intialising the site
document.getElementById("submit-product").addEventListener("click" , collectAndSubmit);
window.onload = updateEmployeeName();
window.onload = activateAnalytics();
window.onload = addPlatform;
window.onload = document.getElementById("add-product").click();
addPlatformButton.addEventListener("click" , function(){ addPlatform()});


