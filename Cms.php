<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/CSS/Cms.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    </head>
    <body>
     <!-- Div containing the top bar of the page this houses the logo and logout button -->
        <div id="top-bar">
            <div id="company-logo"></div>
            <div id="employee-id"></div>
            <div id="live-date">
                <div id=date></div>
                <div id=time></div>
            </div>
            <div id="logout-button">LOGOUT</div>
        </div>
        <div id="page">
            <!-- html for the sidebar allowing for selections from the below options -->
            <div id="options-bar" class="height">
                <div class="header" id="product-management">Products</div>
                <div class="options" id="add-product">Add Games</div>
                <div class="options" id="view-product">Manage Games</div>
                <div class="header" id="order-management">Orders</div>
                <div class="options" id="manage-orders">Manage Orders</div>
            </div>
            <!--content page displays all the different permutations of pages below -->
            <div id="content">
                <!--Html for the view order page-->
                <div id="detailed-order-page">
                    <div id="return-to-orders-page">Return to Orders</div>
                    <div id="order-details">Order Details</div>
                    <div id="date-placed-container">
                        <div id="order-date-text">Order Date:</div>
                        <div id="order-date"></div>
                    </div>
                    <div id="order-id-container">
                        <div id="order-id-text">Order ID:</div>
                        <div id="order-id"></div>
                    </div>
                    <div id="order-status-container">
                        <div id="order-status-text">Order Status:</div>
                        <div id="order-status"></div>
                    </div>
                    <div id="item-container">
                        <div id="item-table-headers">
                            <div id="item-header">Item</div>
                            <div id="platform-header">Platform</div>
                            <div id="quantity-header">Qty</div>
                            <div id="subtotal-header">Subtotal</div>
                        </div>
                    </div>
                    <div id="total-container">
                        <div id="total-text">Total</div>
                        <div id="total-price"></div>
                    </div>
                    <div id="shipping-address-text">Shipping Details</div>
                    <div class="shipping-line"></div>
                    <div class="shipping-line"></div>
                    <div class="shipping-line"></div>
                    <div class="shipping-line"></div>
                    <div id="order-action-bar">
                        <div id="delete-order">Delete</div>
                    </div>
                </div>
                <!--Html for the view order tabs page-->
                <div id ="orders">
                    <div id="order-options">
                        <div class="order-tabs activeOrder" id="pending">Orders</div>
                    </div>
                    <div id="display-order-tabs">
                    </div>
                </div>
                <div id="modal-box">
                    <div id="modal-content">
                        <div id="modal-text">Game Added Succesfully</div>
                         <div class="modal-button" id="modal-button-addGame">OK</div>
                         <div class="modal-button" id="modal-button-deleteGame">OK</div>
                    </div>
                </div>
                <!--Html for product details page-->
                <div id="detailed-product-page">
                    <div id="return-to-search-button">Return to Search Results</div>
                    <div id="detail-product-title">Minecraft PS4 Edition</div>
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
                    <div id="action-bar">
                        <div id="delete-product-button">Delete Product</div>
                        <div id="edit-product-button">Edit Product</div>
                    </div>
                </div>
                <!--Html for product details tabs-->
                <div id="view-product-page" class="main-tabs">
                    <div id="view-game-header">Enter Game Title </div>
                    <div id="search-container">
                        <div id="search-button">Search</div>
                        <input type="text" id="search-input">
                    </div>
                    <div id="search-results">
                    </div>
                </div>
                <!--Html for adding product to database-->
                <div id="add-product-page" class="main-tabs">
                    <div id="first-row" class="rows">
                        <div class="input-headers">Add Game Title</div>
                        <input type="text" id="game-title">
                    </div>
                    <div id="second-row" class="rows">
                        <div class="input-headers">Add Price</div>
                        <input type="text" id="game-price">
                    </div>
                    <div id="third-row" class="rows">
                        <div class="input-headers">Platform and quantity</div>
                        <div class="platforms">
                            <div class="platform-selection-container">
                                <div class="platform-text">Platform:</div>
                                <div class="vertical-split">
                                    <div class="select-platform">--Select--</div>
                                    <div class="drop-down-content">
                                        <div class="first-platform"></div>
                                        <div class="second-platform"></div>
                                        <div class="third-platform"></div>
                                    </div>
                                    <div class="index-of-content">0</div>
                                    <div class="hidden-indicator">default</div>
                                </div>
                            </div>
                            <div class="quantity">
                                <div class="quantity-text">Quantity:</div>
                                <input type="text" class="game-quantity">
                            </div>
                            <div class="close">X</div>
                        </div>
                        <div id="platforms-button-divider"></div>
                        <div id="add-more-platforms">Add Another Platform +</div>
                    </div>
                    <div id="fourth-row" class="rows">
                        <div class="input-headers">Genres</div>
                        <div id="checkbox-container">
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Action" value="Action" unchecked>
                                <label for="Action">Action</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Adventure" value="Adventure" unchecked>
                                <label for="Adventure">Adventure</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Family" value="Family" unchecked>
                                <label for="Family">Family</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Fighting" value="Fighting" unchecked>
                                <label for="Fighting">Fighting</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Horror" value="Horror" unchecked>
                                <label for="Horror">Horror</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Looter" value="Looter" unchecked>
                                <label for="Looter">Looter</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Multiplayer" value="Multiplayer" unchecked>
                                <label for="Multiplayer">Multiplayer</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Racing" value="Racing" unchecked>
                                <label for="Racing">Racing</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="RPG" value="RPG" unchecked>
                                <label for="RPG">RPG</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Shooter" value="Shooter" unchecked>
                                <label for="Shooter">Shooter</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Simulation" value="Simulation" unchecked>
                                <label for="Simulation">Simulation</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Sport" value="Sport" unchecked>
                                <label for="Sport">Sport</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Strategy" value="Strategy" unchecked>
                                <label for="Strategy">Strategy</label>
                            </div>
                            <div class="checkbox-top">
                                <input type="checkbox" class="checkbox" id="Survival" value="Survival" unchecked>
                                <label for="Survival">Survival</label>
                            </div>
                        </div>
                        <div id="genre-description">*Select at least one category from the above</div> 
                    </div>
                    <div id="fifth-row" class="rows">
                        <div class="input-headers">ESRB Rating</div>
                        <form id="rating-box">
                            <div class="rating-vertical">
                                <div class="rating-image" id="E-image"></div>
                                <input type="radio" class="radio-esrb" id="E" name="Rating" value="E" checked>
                            </div>
                            <div class="rating-vertical">
                                <div class="rating-image" id="E10-image"></div>
                                <input type="radio" class="radio-esrb" id="E10" name="Rating" value="E10" unchecked>
                            </div>
                            <div class="rating-vertical">
                                <div class="rating-image" id="T-image"></div>
                                <input type="radio" class="radio-esrb" id="T" name="Rating" value="T" unchecked>
                            </div>
                            <div class="rating-vertical">
                                <div class="rating-image" id="M-image"></div>
                                <input type="radio" class="radio-esrb" id="M" name="Rating" value="M" unchecked>
                            </div>
                            <div class="rating-vertical">
                                <div class="rating-image" id="AO-image"></div>
                                <input type="radio" class="radio-esrb" id="AO" name="Rating" value="AO" unchecked>
                            </div>
                        </form>
                    </div>
                    <div id="sixth-row" class="rows">
                        <div class="input-headers">Description</div>
                        <textarea id="game-description" name="game-description" rows="8" cols="100"></textarea>
                    </div>
                    <div id="seventh-row" class="rows">
                        <div class="input-headers">Upload Image</div>
                        <div id="drag-target">Drag image here</div>
                        <div id="preview-container">
                            <div id="preview-image"></div>
                            <div id="delete-preview-image">x</div>
                        </div>
                    </div>
                    <div id="submit-product">Submit</div>
                    <div id="edit-button-container">
                        <div class="edit-buttons" id="edit-and-save-button">Save Changes</div>
                        <div class="edit-buttons" id="exit-without-changing">Exit</div>
                    </div>
                </div>   
            </div>
        </div>
        <!-- scripts for running the page -->
        <script type="text/javascript" src="/JavaScript/liveDate.js"></script>
        <script type="text/javascript" src="/JavaScript/Cms.js"></script>
    </body>
</html>




