//Search-box

const search = document.querySelector("#site-search"); 
const productsContainer = document.querySelector(".jackets");

search.onkeyup = function() {
    const searchbox = document.querySelector("#site-search").value.toLowerCase();
    const product = document.querySelectorAll(".div-jackets");
    const productDetails = productsContainer.querySelectorAll(".jacket-description");

    for(let i = 0; i < productDetails.length; i++){
        let match = product[i].querySelectorAll(".jacket-description") [0];

        if(match){
            let textValue = match.textContent || match.innerHTML

            if(textValue.toLowerCase().indexOf(searchbox) > -1){
                product[i].style.display = "";
            } else {
                product[i].style.display = "none";
            }
        }
    }

}

//CART

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active")
}

closeCart.onclick = () => {
    cart.classList.remove("active")
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //QUANTITY CHANGES
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //ADD TO CART
    let addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //BUY BUTTON WORK
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}
//BUY BUTTON
function buyButtonClicked() {
    /*alert("Your order is placed");*/
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//REMOVE ITEMS FROM CART
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//QUANTITY CHANGES
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

//ADD TO CART
function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let carItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = carItems.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText === title.toUpperCase()) {
            alert("You have already add this item to the cart");
            return;
        }   
    }

let cartBoxContent = `
                    <img src="${productImg}" alt="man wearing a red jacket loocking to the sky in the mountains" class="cart-img"/>
                    <div class="detail-box">
                        <h2 class="cart-product-title">${title}</h2>
                        <p class="cart-price">${price}</p>
                        <input type="number" value="1" class="cart-quantity" min="1" max="5" />
                    </div>
                    <!-- Remove Cart -->
                    <i class="fa-regular fa-trash-can cart-remove"></i>
                    <span class="visible-hidden">Remove item</span>`;

cartShopBox.innerHTML = cartBoxContent;
carItems.append(cartShopBox);
cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);


    if(cartBoxContent === false){
        cartIcon.style.color = "black";
    } else {
        cartIcon.style.color = "red";
    }
}

//UPDATE TOTAL
function updatetotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("Kr", ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }
        document.getElementsByClassName("total-price")[0].innerText = "Kr " + total;
};

//CART NOTIFICATION

const productsInCart = document.querySelector(".detail-box");



    
