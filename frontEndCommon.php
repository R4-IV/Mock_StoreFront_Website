<?php
// Outputs the html for the header tags up until the styleshhet
//tag this is done so that page specific css files can be used 
//on their respective pages.
function outputHeader($title){
    echo '<!DOCTYPE html>';
    echo '<html>';
    echo '<head>';
    echo '<meta charset="utf-8">';
    echo '<title>' . $title . '</title>';
    echo '<link rel="stylesheet" href="/CSS/common.css">';
    echo '<link rel="SHORTCUT ICON" href="Assets/Images/favicon.ico" type="image/ico" />';
}
//Various php functions that output arrays with link and page names, used 
// in some of the for loops when outputting html.
function provideLinks(){
    $links = array("/frontEnd.php","/registration.php","/basket.php");
    return $links;
}
function provideLinkNames(){
    $linkNames = array("Home","Registration","Basket");
    return $linkNames;
}
//Ascociative array used to store key value pairs used to set animation start for 
//navigation bars.
function provideAnimationMap(){
    $animationMap = array();
    $animationMap["Home"] = "startHome";
    $animationMap["Registration"] = "startRegistration";
    $animationMap["Basket"] = "startLeaderboard";
    return $animationMap; 
}
//Outputs the top banner logo and nav links along with the mobile layout versions 
//that are initially hidden.
function outputNav($title){
    //variables storing arrays from outside functions at a local level
    $links = provideLinks();
    $linkNames = provideLinkNames();
    $animationMap = provideAnimationMap();
    echo '</head>';
    echo '<body class="container">';
    echo '<div class="navBar">';
    echo '<a class="logoContainer" href="frontEnd.php"><img class="logo" src="/Assets/Images/Logo.svg" alt="Logo"></a>';
    echo '<div id="dropdownContainer">';
    //Creates div element that anchors the nav in place.
    echo '</div>';
    echo '<div id="dropdown"></div>';
    echo '<div class="links">';
    //for loops output the anchor tags and the div tag for links
    //and animation classes for desktop layout navigation by looping through arrays.
    for($i = 0; $i < count($links); $i++ ){
        echo '<div class="navContainer">';
        echo '<a class="nav disableSelect "';
        echo 'href="' . $links[$i] . '">' . $linkNames[$i] . '</a>';
        echo '</div>';
    }
    echo '<div class=" animation ' ;
    for($i = 0; $i < count($linkNames); $i++){
        if($linkNames[$i] == $title){
            echo $animationMap[$title] . ' "></div>';
        }
    }
    //outputs navigation bar closing div 
    echo '</div>';
    echo '</div>';
}
?>

