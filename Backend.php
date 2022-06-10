<?php
//Platform object used to save platforms in created objects
class Platform {
    public $platform;
    public $quantity;
    //constructor takes a platform and quantity to create object.
    function __construct($platform , $quantity){
        $this->platform = $platform;
        $this->quantity = $quantity;
    }
}

class Address {
    public $house_number;
    public $street;
    public $city;
    public $postcode;

    function __construct($house_number , $street , $city, $postcode){
        $this->house_number = $house_number;
        $this->street = $street;
        $this->city = $city;
        $this->postcode = $postcode;
    }
}
//function handles login returning the path to cms page upon succcesful login
function loginEmployee($username , $password_hash){
    $valid_login = false;
    //opens access to databases
    $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    //filter options to find the employee by username 
    $filter = [
        'username' => $username,
    ];
    //options allows for only specific fields to be returned
    $options = [
        'projection' => [
            'username' => 1,
            'password' => 1,
            'account_type' => 1,
        ],
    ];
    //query created to find a specific user name 
    $query = new MongoDB\Driver\Query($filter ,$options);
    //cursor object stores all documents that match the specs 
    $cursor = $manager->executeQuery('EcommerceDB.Employees', $query);
    //converts cursor to array
    $storage_arrray = ($cursor->toArray());
    //checks if query results exist 
    if(count($storage_arrray) == 0){
        echo "False";
        return;
    }
    else{
        if((string)$storage_arrray[0]->password === $password_hash){
            echo "/Cms.php";
            return;
        }
    }
    if($valid_login == false){
        echo "False";
        return;
    }
}
//takes image data sent from javascript and saves it as a specific file name in the server dir
function uploadImage(){
    //directory path
    $directory = "Assets/Images/Thumbnails/";
    $endFile = $directory . basename($_FILES["image"]["name"][0]);
    move_uploaded_file($_FILES["image"]["tmp_name"][0], $endFile);
    //returns the path to the file so that it can be saved to the database in a different function
    return  "/" . $endFile;
}
//takes text data from game description creates a file and saves 
function uploadDescription($titleVar , $descriptionVar){
    $directory_text = "Assets/Descriptions/" . $_POST[$titleVar] . ".txt";
    $description = $_POST[$descriptionVar];
    file_put_contents($directory_text, $description);
    //returns path to text 
    return  "/" . $directory_text;
}
//function makes an array of platform objects used to save 
function makePlatformArray($platformObject){
    $platform_string = $_POST[$platformObject];
    $platform_string_arr = explode("," , $platform_string);
    $temp_val = "";
    $track = 0;
    $platformArray = array();
    //array contains both platforms and quantities using this for loop prevents me from constructing a platform with undefined variables
    for($i = 0; $i < count($platform_string_arr); $i++){
        if($track == 0){
            $temp_val = $platform_string_arr[$i];
            $track++;
        }
        else{
            $PlatformObject = new Platform($temp_val , $platform_string_arr[$i]);
            array_push($platformArray , $PlatformObject);
            $track--;
        } 
    }
    //returns the platform array so that it can be saved to the databases
    return $platformArray;
}
//function saves the game from the javascript create game function to the database
function saveGameToDB(){
    $manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
    //retrieves array of platform objects from the previous function
    $platformArray = makePlatformArray("platforms");
    $genres_string = $_POST["genres"];
    //using explode to create a string array based on a delimeter character
    $genres_string_arr = explode("," , $genres_string);
    $bulk = new MongoDB\Driver\BulkWrite;
    //creates a document variable 
    $doc = [
        "title" => $_POST["game-title"] ,
        "price" => $_POST["game-price"] ,
        "platforms" => $platformArray ,
        "esrb_rating" => $_POST["esrb"] ,
        "genres" => $genres_string_arr ,
        "thumbnail_link" => uploadImage() ,
        "description_link" => uploadDescription("game-title" , "description") ,
    ];
    //specified the action to be executed in this case insert 
    $bulk->insert($doc);
    //executes the action
    $result = $manager->executeBulkWrite('EcommerceDB.Games', $bulk);
}
//function deletes specified gameID
function deleteGame(){
    $manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
    $deleteDocument = new MongoDB\Driver\BulkWrite;
    //in order to perform any operation on an id it must first be converted to an ObjectID
    $deleteDocument->delete(['_id' =>new MongoDB\BSON\ObjectID($_POST["id"])]);
    $result = $manager->executeBulkWrite('EcommerceDB.Games', $deleteDocument);
}
//function returns an array of json encoded documents based on the supplied string regex
function returnRegex(){
    $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    //i modifier matches elements regardless of case
    $filter = ["title" => new MongoDB\BSON\Regex($_POST["search"] , "i")];
    $query = new MongoDB\Driver\Query($filter);
    $cursor = $manager->executeQuery('EcommerceDB.Games', $query);
    $storage_arrray = ($cursor->toArray());
    echo json_encode($storage_arrray);
}
//function takes all values of the updated product object and overwrites them in the database
function updateDatabase(){
    $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $platformArray = makePlatformArray("u-platforms");
    $genres_string = $_POST["u-genres"];
    $genres_string_arr = explode("," , $genres_string);
    $thumbnail = uploadImage();
    $description = uploadDescription("u-game-title" , "u-description");
    $bulk = new MongoDB\Driver\BulkWrite;
    //overwrites the previous fields with updated data based on the game_id
    $bulk->update(
        ["_id" => new \MongoDB\BSON\ObjectID($_POST["u_id"])],
        ['$set' => ['title' => $_POST["u-game-title"],
        'price' => $_POST["u-game-price"],
        'platforms' => $platformArray,
        'esrb_rating' => $_POST["u-esrb"],
        'genres' => $genres_string_arr,
        'thumbnail_link' => $thumbnail,
        'description_link' => $description]],
        ['multi' => false , 'upsert' => false]
    );
    //multi matches to one in this case and upsert will prevent a new document creation if no match is found
    $result = $manager->executeBulkWrite('EcommerceDB.Games', $bulk);
}
//function returns all orders with the specified status in this case the only option is pending as per the javascript 
function getOrders(){
    $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $filter = ["status" => $_POST["status"]];
    $query = new MongoDB\Driver\Query($filter);
    $cursor = $manager->executeQuery('EcommerceDB.Orders', $query);
    $storage_arrray = ($cursor->toArray());
    echo json_encode($storage_arrray);
}
//function returns a customer object based on the customer_id
function returnCustomer(){
    $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $filter = ["_id" => new \MongoDB\BSON\ObjectID($_POST["userID"])];
    $query = new MongoDB\Driver\Query($filter);
    $cursor = $manager->executeQuery('EcommerceDB.Customers', $query);
    $storage_arrray = ($cursor->toArray());
    echo json_encode($storage_arrray);
}
//function used to return an array of game object this is used to populate game details on the view order page in the cms
function returnGames(){
    $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $games_string = $_POST["gameIDs"];
    $games_string_arr = explode(" " , $games_string);
    $allGames = array();
    //loops through all the ids provided making a query for each of them and then pushes them to the allGames array
    for($i = 0; $i < count($games_string_arr) -1; $i++){
        $filter = ["_id" => new \MongoDB\BSON\ObjectID($games_string_arr[$i])];
        $query = new MongoDB\Driver\Query($filter);
        $cursor = $manager->executeQuery('EcommerceDB.Games', $query);
        $storage_array = ($cursor->toArray());
        array_push($allGames , $storage_array[0]);
    }
    echo json_encode($allGames);
}
//deletes order document based on the supplied order_id 
function deleteOrder(){
    $manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
    $deleteDocument = new MongoDB\Driver\BulkWrite;
    $deleteDocument->delete(['_id' =>new MongoDB\BSON\ObjectID($_POST["order_id"])]);
    $result = $manager->executeBulkWrite('EcommerceDB.Orders', $deleteDocument);
    echo "success";
}
//function used to check if an email already exists during the registration process
function checkEmail(){
    $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $filter = ["email_address" => $_POST["check_email"]];
    $query = new MongoDB\Driver\Query($filter);
    $cursor = $manager->executeQuery('EcommerceDB.Customers', $query);
    $storage_arrray = ($cursor->toArray());
    if(count($storage_arrray) == 0){
        echo "no match";
    }
    else{
        echo "match";
    }
}
//function adds the customer to the database 
function saveCustomerToDB(){
    $manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
    $bulk = new MongoDB\Driver\BulkWrite;
    //creates a document variable with all the customers information
    $doc = [
        "first_name" => $_POST["first_name"] ,
        "last_name" => $_POST["last_name"] ,
        "date_of_birth" => $_POST["DOB"] ,
        "email_address" => $_POST["email_address"] ,
        "password" => $_POST["cus_password"] ,
        "address" => new Address($_POST["house"],$_POST["street"],$_POST["city"],$_POST["postcode"])
    ];
    //specified the action to be executed in this case insert 
    $bulk->insert($doc);
    //executes the action
    $result = $manager->executeBulkWrite('EcommerceDB.Customers', $bulk);
    echo "registered succesfully";
}
//If statents act as filters for all the requests coming from client side javascript
//Login
if(isset($_GET["username"]) && isset($_GET["password"])){
    loginEmployee($_GET["username"] , $_GET["password"]);
}
//Create Game
if(isset($_POST["game-title"])){
    saveGameToDB();
    echo "success";
}
//Edit Game
if(isset($_POST["u-game-title"])){
    updateDatabase();
    echo "success";
}
//Delete Game
if(isset($_POST["id"])){
    deleteGame();
    echo "OK";
}
//search Functionality
if(isset($_POST["search"])){
    returnRegex();
}
//returns Orders
if(isset($_POST["status"])){
    getOrders();
}
//returns Customer
if(isset($_POST["userID"])){
    returnCustomer();
}
//returns an array of games 
if(isset($_POST["gameIDs"])){
    returnGames();}
//Deletes Specified Order
if(isset($_POST["order_id"])){
    deleteOrder();
}
//Checks for duplicate emails
if(isset($_POST["check_email"])){
    checkEmail();
}
//Adds customer to database
if(isset($_POST["cus_password"])){
    saveCustomerToDB();
}
?>