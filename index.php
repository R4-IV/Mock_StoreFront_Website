<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Link to index specific style sheets -->
        <link rel="stylesheet" href="/CSS/index.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js" integrity="sha512-nOQuvD9nKirvxDdvQ9OMqe2dgapbPB7vYAMrzJihw5m+aNcf0dX53m6YxM4LgA9u8e9eg9QX+/+mPu8kCNpV2A==" crossorigin="anonymous"></script>
    </head>
    <body id="Background">
    <!-- Bounding box contains all elements on the page -->
    <div id="login">
        <!-- Contains the logo and customer management text, set up this way so flex direction collumn would result in a desirable layout -->
        <div id= blackTag>
            <div id="LoginHeader">
                <!-- Company logo set in css as background image property hence no image tags -->
                <div id="companyLogo"></div>
                <div id="loginText">Customer Management System</div>
            </div>
        </div>
            <!-- Form used to capture user input and eventually send it to the server for comparison -->
        <form id="loginForm">
        <div class="inputs">
        <div id="userIcon"></div>
        <input type="text" id="Username" name="username" placeholder="Username">
        </div>
        <div class="inputs">
        <div id="passwordIcon"></div>
        <input type="password" id="Password" name="password" placeholder="Password">
        </div>
        <input type="submit" id="submit" value="LOGIN">
        </form>
    </div>
    <script type="text/javascript" src="/JavaScript/cmsLogin.js"></script>
    </body>
</html>