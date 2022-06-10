<?php
include('frontEndCommon.php');
outputHeader("Home");
?>
<!-- Link to home specific style sheet -->
<link rel="stylesheet" href="/CSS/Cms.css">
<link rel="stylesheet" href="/CSS/frontEnd.css">

<?php
outputNav("Home");
?>
<!-- Search bar related divs -->
<div id="view-product-page" class="main-tabs">
    <div id="view-game-header">Enter Game Title </div>
    <div id="search-container">
        <div id="search-button">Search</div>
        <input type="text" id="search-input">
    </div>
    <div id="sort-container">
        <!-- sorting related divs -->
        <div id="sort-text">Sort Price:</div>
        <div id="highest">Highest</div>
        <div id="lowest">Lowest</div>
    </div>
    <!-- search results stored in here -->
    <div id="search-results">
    </div>
</div>
<!-- detailed product page divs  -->
<div id="detailed-product-page">
    <div id="return-to-search-button">Return to Search Results</div>
    <div id="detail-product-title"></div>
    <div id ="detailed-product-details">
        <div id="detailed-product-image"></div>
        <div id="detailed-product-information">
             <div id="platform-table">
                <div id="available-platforms">Available Platforms</div>
                <div id="detailed-platforms">
                    <div id="detailed-platform-text" class="individual-detailed-platform">Platform</div>
                </div>
                <div id="detailed-quantity">
                    <div id="detailed-quantity-text"class="individual-detailed-quantity">Quantity</div>
                </div>
            </div>
            <div id="detailed-container">
            <div id="detailed-ESRB-container">
                <div id="ESRB-text">ESRB Rating</div>
                <div id="ESRB-image"></div>
            </div>
            <div id="detailed-Price-container">
                <div id="price-text">Price</div>
                <div id="numeric-price"></div>
            </div>
        </div>
        <div id="detailed-genres">Genres</div>
        <div id="genres-container">
         </div>
    </div>
</div>
<div id="synopsis">Synopsis</div>
<div id="detailed-description-text">Description</div>
<!-- Add to basket button needs to be accessed via js -->
<div id="add-to-basket">Add to Basket</div>
</div>
<script type="text/javascript" src="/JavaScript/frontEndSearch.js"></script>
</body>
</html>

