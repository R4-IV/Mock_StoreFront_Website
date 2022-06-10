<?php
include('frontEndCommon.php');
outputHeader("Registration");
?>
<!-- Link to home specific style sheet -->
<link rel="stylesheet" href="/CSS/registration.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js" integrity="sha512-nOQuvD9nKirvxDdvQ9OMqe2dgapbPB7vYAMrzJihw5m+aNcf0dX53m6YxM4LgA9u8e9eg9QX+/+mPu8kCNpV2A==" crossorigin="anonymous"></script>
<?php
outputNav("Registration");
?>
<div class="content">
    <div class="regPage" id="registrationBox">
        <!-- Creates registration text div -->
        <div id="regText">REGISTRATION:</div>
        <!-- Input form for capturing user input  -->
        <form id="regInputs">
            <!-- Creates row elements containing text input field and space for a check or error mark  -->
            <div class="row">
                <div class="text">FIRST NAME:</div>
                <input type="text" class="inputs" id="firstName" name="firstName" placeholder="First Name">
                <div class="checkmarkSpacer" id="firstNameCheck"></div>
            </div>
            <div class="row">
                <div class="text">LAST NAME:</div>
                <input type="text" class="inputs" id="lastName" name="lastName" placeholder="Last Name/Surname">
                <div class="checkmarkSpacer" id="lastNameCheck"></div>
            </div>
            <div class="row">
                <div class="text">EMAIL ADDRESS:</div>
                <input type="text" class="inputs" id="emailAddress" name="emailAddress" placeholder="Email Address">
                <div class="checkmarkSpacer" id="emailAddressCheck"></div>
            </div>
            <!-- Date of birth element has 3 inputs in the row instead of the usual 1  -->    
            <div class="row">
                <div class="text">DATE OF BIRTH:</div>
                <div class = inputs>
                    <input type="text" class="inputsInner" id="dobDay" name="dobDay" placeholder="DD">
                    <input type="text" class="inputsInner" id="dobMonth" name="dobMonth" placeholder="MM">
                    <input type="text" class="inputsInner" id="dobYear" name="dobYear" placeholder="YYYY">
                </div>
                <div class="checkmarkSpacer" id="dateCheck"></div>
            </div>
            <!-- Spacer element used to create a divide between passwords and previous input elements  -->
            <div class="regSpacer"></div>
            <div class="row">
                <div class="text">PASSWORD:</div>
                <input type="password" class="inputs" id="password" name="password" placeholder="password">
                <div class="checkmarkSpacer" id="passwordCheck"></div>
            </div>   
            <div class="row">
                <div class="text">CONFIRM<br>PASSWORD:</div>
                <input type="password" class="inputs" id="confirmPassword" name="confirmPassword" placeholder="password">
                <div class="checkmarkSpacer" id="passwordConfirmCheck"></div>
            </div>
            <!-- div class containing instruction in reference to password format -->
            <div class="instruction">Password must be at least 8 characters long and must include 
                atleast one Uppercase letter and atleast one number. 
            </div>   
            <!-- new address fields added to the html -->
            <div class="row">
                <div class="text">HOUSE NUMBER:</div>
                <input type="text" class="inputs" id="house-number" name="house-number" placeholder="house no">
                <div class="checkmarkSpacer" id="housenoCheck"></div>
            </div>
            <div class="row">
                <div class="text">STREET:</div>
                <input type="text" class="inputs" id="street" name="street" placeholder="street">
                <div class="checkmarkSpacer" id="streetCheck"></div>
            </div>
            <div class="row">
                <div class="text">CITY:</div>
                <input type="text" class="inputs" id="city" name="city" placeholder="city">
                <div class="checkmarkSpacer" id="cityCheck"></div>
            </div>
            <div class="row">
                <div class="text">POSTCODE:</div>
                <input type="text" class="inputs" id="postcode" name="postcode" placeholder="postcode">
                <div class="checkmarkSpacer" id="postcodeCheck"></div>
            </div>
            <!-- div class containing instruction in reference to username format -->
            <input type="submit" id="register" value="Register">
            <!-- anchor hyperlink back to login page  -->
        <!-- End of user input form -->
        </form>
    <!-- closes reg page -->
    <script type="text/javascript" src="/JavaScript/registration.js"></script>
    </div>
</body>
</html>