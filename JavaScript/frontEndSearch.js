//variable stores the value of game array used in sorting functions to pass the array to be sorted 
var result = 0;
//variable storing the search button div 
let searchInput = document.getElementById("search-button");
//adds click listener to the search buttin div
searchInput.addEventListener("click" , function(){
    handleSearch(0);
});
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
//function gets the selected regex items from the server an displays them as tabs
async function handleSearch(val){
    let searchValue = document.getElementById("search-input").value;
    //if the search bar is empty then the program does nothing and returns
    if(searchValue.length == 0){
        return;
    }
    //if searched will use data from server 
    else if(val == 0){
        const formData = new FormData();
        formData.append("search" , searchValue);
        result = await asyncAwaitXhrRequest("POST" , "Backend.php" , formData );
        result = JSON.parse(result);
    }
    //else will use the sorted array as a value instead
    else{
        result = val;
    }
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
    returnToSearch.addEventListener("click" , returnToSearchResults);
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
//function used to return to search result
function returnToSearchResults(){
    document.getElementById("detailed-product-page").style.display = "none";;
    document.getElementById("view-product-page").style.display = "block";
    document.getElementById("detailed-platforms").innerHTML = "<div id=\"detailed-platform-text\" class=\"individual-detailed-platform\">Platform<\/div>";
    document.getElementById("detailed-quantity").innerHTML = "<div id=\"detailed-quantity-text\"class=\"individual-detailed-quantity\">Quantity<\/div>";
}
//variable storing highest sort button and its click listener
let highestButton = document.getElementById("highest");
highestButton.addEventListener("click" , function(){
    sortHighest(result);
} )
//variable storing lowest sort button and its click listener
let lowestButton = document.getElementById("lowest");
lowestButton.addEventListener("click" , function(){
    sortLowest(result);
})
//insertion sort highest price first 
function sortHighest(searchArray){
    if(searchArray == 0){
        return;
    }
    let index = 0;
    sortedArr = new Array();
    for(i = 0; i < searchArray.length; i++ ){
        if(sortedArr.length == 0){
            sortedArr.push(searchArray[i]);
            continue;
        }
        while(sortedArr[index] != null && parseFloat(searchArray[i].price) < parseFloat(sortedArr[index].price)){
            index++;
        }
        sortedArr.splice(index , 0 , searchArray[i]);
        index = 0;
    }
    handleSearch(sortedArr);
}
//insertion sort lowest price first 
function sortLowest(searchArray){
    if(searchArray == 0){
        return;
    }
    let index = 0;
    sortedArr = new Array();
    for(i = 0; i < searchArray.length; i++ ){
        if(sortedArr.length == 0){
            sortedArr.push(searchArray[i]);
            continue;
        }
        while(sortedArr[index] != null && parseFloat(searchArray[i].price) > parseFloat(sortedArr[index].price)){
            index++;
        }
        sortedArr.splice(index , 0 , searchArray[i]);
        index = 0;
    }
    handleSearch(sortedArr);
}


