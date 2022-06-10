//function returns the correct suffix based on the last digit of the current day
function makeSuffix(numericDay){
    let lastNum = numericDay % 10;
    let suffixStr ="";
    switch(lastNum){
        case 1:
            suffixStr = "st";
            break;
        case 2:
            suffixStr = "nd";
            break;
        case 3:
            suffixStr = "rd";
            break;
        default:
            suffixStr = "th";
    }
    return suffixStr;
}
//function handles single digit 0 in the time display
function handleSingleDigit(singleDigitNum){
    if(singleDigitNum < 10 ){
        let leadingZero = "0" + singleDigitNum;
        return leadingZero;
    }
    else{
        return singleDigitNum;
    }
}
//function updates clock at set intervals set below 
function updateClock(){
    let clockFirstRow = document.getElementById("date");
    let clockSecondRow = document.getElementById("time");
    //returns the current data and time 
    let clock = new Date();
    //hashmap for quick conversion between month integers and month Strings 
    let monthMap = new Map([
        [0 , "January"],
        [1 , "February"],
        [2 , "March"],
        [3 , "April"],
        [4 , "May"],
        [5 , "June"],
        [6 , "July"],
        [7 , "August"],
        [8 , "September"],
        [9 , "October"],
        [10 , "November"],
        [11 , "December"]
    ]);
    //variables used to hold each indivdual aspect of the displayed date
    let year = clock.getFullYear();
    let month = monthMap.get(clock.getMonth());
    let day = clock.getDate();
    let suffix = makeSuffix(day);
    let hour = handleSingleDigit(clock.getHours());
    let minutes = handleSingleDigit(clock.getMinutes());
    //loads the values into the HTML 
    clockFirstRow.innerHTML = month + " " + day + suffix + " " + year;
    clockSecondRow.innerHTML = hour + ":" + minutes;
}
//updates the clock every 60,000ms = 60s
window.onload = updateClock();
setInterval(updateClock, 60000);



