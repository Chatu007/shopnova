/* =====================================================
   SHOPNOVA
   JavaScript Shopping Website
   No API - No Gemini - No Backend
   ===================================================== */


/* =========================
   PRODUCT DATA
========================= */

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        rating: 4.5,
        image: "headphone.avif",
        description: "Wireless headphones with clear sound and comfortable design."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Watches",
        price: 2999,
        rating: 4.4,
        image: "watch.avif",
        description: "Smart watch with fitness tracking and useful notifications."
    },

    {
        id: 3,
        name: "Gaming Mouse",
        category: "Gaming",
        price: 1499,
        rating: 4.6,
        image: "mouse.avif",
        description: "Fast and accurate gaming mouse for PC gaming."
    },

    {
        id: 4,
        name: "Running Shoes",
        category: "Shoes",
        price: 1999,
        rating: 4.3,
        image: "shoes.avif",
        description: "Comfortable running shoes for sports and everyday use."
    },

    {
        id: 5,
        name: "College Backpack",
        category: "Fashion",
        price: 1299,
        rating: 4.2,
        image: "bag.avif",
        description: "Stylish and spacious backpack for college and travel."
    },

    {
        id: 6,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1799,
        rating: 4.5,
        image: "jbl.avif",
        description: "Portable Bluetooth speaker with powerful sound."
    },

    {
        id: 7,
        name: "Smartphone",
        category: "Electronics",
        price: 14999,
        rating: 4.7,
        image: "phone.avif",
        description: "Modern smartphone with a large display and powerful performance."
    },

    {
        id: 8,
        name: "Sunglasses",
        category: "Fashion",
        price: 999,
        rating: 4.1,
        image: "sunglasses.avif",
        description: "Stylish sunglasses for everyday outdoor use."
    },

    {
        id: 9,
        name: "Mechanical Keyboard",
        category: "Gaming",
        price: 3499,
        rating: 4.8,
        image: "keyboard.avif",
        description: "Mechanical keyboard for gaming and productivity."
    },

    {
        id: 10,
        name: "Casual Jacket",
        category: "Fashion",
        price: 2499,
        rating: 4.4,
        image: "jacket.avif",
        description: "Modern casual jacket with a comfortable stylish design."
    }

];


/* =========================
   LOCAL STORAGE
========================= */

let cart = JSON.parse(
    localStorage.getItem("shopnovaCart")
) || [];

let wishlist = JSON.parse(
    localStorage.getItem("shopnovaWishlist")
) || [];

let currentCoupon =
    localStorage.getItem("shopnovaCoupon") || "";


/* =========================
   ELEMENTS
========================= */

const productContainer =
    document.getElementById("productContainer");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const subtotal =
    document.getElementById("subtotal");

const discount =
    document.getElementById("discount");

const shipping =
    document.getElementById("shipping");

const total =
    document.getElementById("total");

const searchInput =
    document.getElementById("searchInput");

const aiInput =
    document.getElementById("aiInput");

const aiResponse =
    document.getElementById("aiResponse");


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {

    return "₹" + price.toLocaleString("en-IN");

}


/* =========================
   SAVE DATA
========================= */

function saveCart() {

    localStorage.setItem(
        "shopnovaCart",
        JSON.stringify(cart)
    );

}

function saveWishlist() {

    localStorage.setItem(
        "shopnovaWishlist",
        JSON.stringify(wishlist)
    );

}


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(list) {

    if (!productContainer) return;

    productContainer.innerHTML = "";

    if (list.length === 0) {

        productContainer.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const isWishlisted =
            wishlist.includes(product.id);


        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <button
                    class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    onclick="toggleWishlist(${product.id})"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;

        productContainer.appendChild(card);

    });

}


/* =========================
   SEARCH
========================= */

function searchProducts() {

    const text =
        searchInput.value
            .toLowerCase()
            .trim();


    const results =
        products.filter(product => {

            return (

                product.name
                    .toLowerCase()
                    .includes(text)

                ||

                product.category
                    .toLowerCase()
                    .includes(text)

                ||

                product.description
                    .toLowerCase()
                    .includes(text)

            );

        });


    displayProducts(results);

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );

}


/* =========================
   CATEGORY FILTER
========================= */

function filterCategory(category) {

    if (category === "All") {

        displayProducts(products);

        return;
    }


    const results =
        products.filter(product =>
            product.category === category
        );


    displayProducts(results);


    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: productId,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    showMessage(
        product.name + " added to cart!"
    );

}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    updateCart();

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            item => item.id === productId
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;
    }


    saveCart();

    updateCart();

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>
                    🛒 Your cart is empty
                </h3>

                <p>
                    Add products to your cart.
                </p>

            </div>

        `;

        updateTotals();

        return;
    }


    cart.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (!product) return;


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        div.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${formatPrice(product.price)}
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${product.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${product.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${product.id})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(div);

    });


    updateTotals();

}


/* =========================
   CART TOTAL
========================= */

function updateTotals() {

    let sub = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (product) {

            sub +=
                product.price *
                item.quantity;

        }

    });


    let discountAmount = 0;


    if (currentCoupon === "SAVE10") {

        discountAmount =
            sub * 0.10;

    }


    if (currentCoupon === "SAVE20") {

        discountAmount =
            sub * 0.20;

    }


    let shippingAmount = 0;


    if (sub > 0 && sub < 3000) {

        shippingAmount = 100;

    }


    const finalTotal =
        sub -
        discountAmount +
        shippingAmount;


    let itemCount = 0;


    cart.forEach(item => {

        itemCount += item.quantity;

    });


    cartCount.textContent =
        itemCount;


    subtotal.textContent =
        formatPrice(sub);


    discount.textContent =
        "- " +
        formatPrice(discountAmount);


    shipping.textContent =
        shippingAmount === 0
            ? "FREE"
            : formatPrice(shippingAmount);


    total.textContent =
        formatPrice(finalTotal);

}


/* =========================
   CLEAR CART
========================= */

function clearCart() {

    if (cart.length === 0) {

        alert("Your cart is already empty.");

        return;
    }


    const answer =
        confirm(
            "Are you sure you want to clear the cart?"
        );


    if (!answer) return;


    cart = [];

    currentCoupon = "";

    localStorage.removeItem(
        "shopnovaCart"
    );

    localStorage.removeItem(
        "shopnovaCoupon"
    );


    updateCart();

}


/* =========================
   COUPON
========================= */

function applyCoupon() {

    const input =
        document.getElementById(
            "couponInput"
        );


    const code =
        input.value
            .toUpperCase()
            .trim();


    if (code === "SAVE10") {

        currentCoupon = "SAVE10";

        localStorage.setItem(
            "shopnovaCoupon",
            "SAVE10"
        );

        alert(
            "10% discount applied!"
        );

    }

    else if (code === "SAVE20") {

        currentCoupon = "SAVE20";

        localStorage.setItem(
            "shopnovaCoupon",
            "SAVE20"
        );

        alert(
            "20% discount applied!"
        );

    }

    else {

        alert(
            "Invalid coupon. Use SAVE10 or SAVE20."
        );

    }


    updateTotals();

}


/* =========================
   WISHLIST
========================= */

function toggleWishlist(productId) {

    if (
        wishlist.includes(productId)
    ) {

        wishlist =
            wishlist.filter(
                id => id !== productId
            );

    }

    else {

        wishlist.push(productId);

    }


    saveWishlist();

    displayProducts(products);

}


/* =========================
   GO TO PRODUCTS
========================= */

function goToProducts() {

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   GO TO CART
========================= */

function goToCart() {

    document.getElementById("cart")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   GO TO CHECKOUT
========================= */

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add a product first."
        );

        return;
    }


    document.getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   SIMPLE AI ASSISTANT
========================= */

function askAI() {

    const question =
        aiInput.value
            .toLowerCase()
            .trim();


    if (question === "") {

        aiResponse.innerHTML = `
            <p>
                Please enter a question.
            </p>
        `;

        return;
    }


    let results = [];

    let message = "";


    /* GAMING */

    if (
        question.includes("gaming") ||
        question.includes("game") ||
        question.includes("gamer")
    ) {

        results =
            products.filter(
                product =>
                    product.category === "Gaming"
            );

        message =
            "🎮 Here are some gaming products:";

    }


    /* HEADPHONES */

    else if (
        question.includes("headphone") ||
        question.includes("headset") ||
        question.includes("music")
    ) {

        results =
            products.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes("headphone")
            );

        message =
            "🎧 You can check these headphones:";

    }


    /* WATCH */

    else if (
        question.includes("watch") ||
        question.includes("fitness")
    ) {

        results =
            products.filter(
                product =>
                    product.category === "Watches"
            );

        message =
            "⌚ Here is a smart watch from our catalog:";

    }


    /* SHOES */

    else if (
        question.includes("shoe") ||
        question.includes("running") ||
        question.includes("sport")
    ) {

        results =
            products.filter(
                product =>
                    product.category === "Shoes"
            );

        message =
            "👟 Check out these shoes:";

    }


    /* FASHION */

    else if (
        question.includes("fashion") ||
        question.includes("jacket") ||
        question.includes("clothes")
    ) {

        results =
            products.filter(
                product =>
                    product.category === "Fashion"
            );

        message =
            "👕 Here are some fashion products:";

    }


    /* SPEAKER */

    else if (
        question.includes("speaker") ||
        question.includes("sound")
    ) {

        results =
            products.filter(
                product =>
                    product.name ===
                    "Bluetooth Speaker"
            );

        message =
            "🔊 Here is a portable speaker:";

    }


    /* PHONE */

    else if (
        question.includes("phone") ||
        question.includes("mobile")
    ) {

        results =
            products.filter(
                product =>
                    product.name ===
                    "Smartphone"
            );

        message =
            "📱 Here is the smartphone in our catalog:";

    }


    /* KEYBOARD */

    else if (
        question.includes("keyboard") ||
        question.includes("typing")
    ) {

        results =
            products.filter(
                product =>
                    product.name ===
                    "Mechanical Keyboard"
            );

        message =
            "⌨️ Here is our mechanical keyboard:";

    }


    /* BAG */

    else if (
        question.includes("bag") ||
        question.includes("backpack") ||
        question.includes("college")
    ) {

        results =
            products.filter(
                product =>
                    product.name ===
                    "College Backpack"
            );

        message =
            "🎒 This backpack is suitable for college:";

    }


    /* SUNGLASSES */

    else if (
        question.includes("sunglass") ||
        question.includes("glasses")
    ) {

        results =
            products.filter(
                product =>
                    product.name ===
                    "Sunglasses"
            );

        message =
            "🕶️ Here are the sunglasses available:";

    }


    /* BUDGET */

    const budgetMatch =
        question.match(
            /(?:under|below|less than|within)\s*₹?\s*(\d+)/
        );


    if (budgetMatch) {

        const budget =
            parseInt(
                budgetMatch[1]
            );


        results =
            products.filter(
                product =>
                    product.price <= budget
            );


        message =
            `💰 Products available under ₹${budget}:`;

    }


    /* GIFT */

    if (
        question.includes("gift") ||
        question.includes("present")
    ) {

        const giftBudget =
            question.match(
                /(?:under|below|less than)\s*₹?\s*(\d+)/
            );


        if (giftBudget) {

            const budget =
                parseInt(
                    giftBudget[1]
                );


            results =
                products.filter(
                    product =>
                        product.price <= budget
                );


            message =
                `🎁 Gift ideas under ₹${budget}:`;

        }

        else {

            results =
                products.filter(
                    product =>
                        product.price <= 2500
                );

            message =
                "🎁 Here are some affordable gift ideas:";

        }

    }


    /* DEFAULT */

    if (
        results.length === 0
    ) {

        results =
            products.slice(0, 3);

        message =
            "✨ I can help you find products. Try asking about gaming, headphones, shoes, watches, gifts or a budget.";

    }


    showAIResults(
        message,
        results
    );


    aiInput.value = "";

}


/* =========================
   SHOW AI RESULTS
========================= */

function showAIResults(
    message,
    results
) {

    aiResponse.innerHTML = `

        <p>
            ${message}
        </p>

        <div class="ai-products">

            ${results.map(product => `

                <div class="ai-product">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div>

                        <h4>
                            ${product.name}
                        </h4>

                        <p>
                            ${product.category}
                        </p>

                        <strong>
                            ${formatPrice(product.price)}
                        </strong>

                    </div>

                    <button
                        onclick="addToCart(${product.id})"
                    >
                        Add
                    </button>

                </div>

            `).join("")}

        </div>

    `;

}


/* =========================
   AI EXAMPLE BUTTON
========================= */

function askExample(text) {

    aiInput.value = text;

    askAI();

}


/* =========================
   ENTER KEY AI
========================= */

if (aiInput) {

    aiInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                askAI();

            }

        }
    );

}


/* =========================
   ORDER
========================= */

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    const name =
        document.getElementById(
            "fullName"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const payment =
        document.getElementById(
            "payment"
        ).value;


    if (
        !name ||
        !email ||
        !phone ||
        !address
    ) {

        alert(
            "Please fill all details."
        );

        return;
    }


    const orderId =
        "SN" +
        Math.floor(
            10000000 +
            Math.random() * 90000000
        );


    const confirmation =
        document.getElementById(
            "orderConfirmation"
        );


    confirmation.innerHTML = `

        <div class="order-success">

            <h2>
                🎉 Order Confirmed!
            </h2>

            <p>
                Thank you, ${name}!
            </p>

            <p>
                Order ID:
                <strong>
                    ${orderId}
                </strong>
            </p>

            <p>
                Payment:
                <strong>
                    ${payment}
                </strong>
            </p>

            <p>
                Total:
                <strong>
                    ${total.textContent}
                </strong>
            </p>

            <p>
                This is a demo checkout.
                No real payment has been processed.
            </p>

        </div>

    `;


    cart = [];

    currentCoupon = "";


    localStorage.removeItem(
        "shopnovaCart"
    );

    localStorage.removeItem(
        "shopnovaCoupon"
    );


    updateCart();


    document.getElementById(
        "checkoutForm"
    ).reset();

}


/* =========================
   SIMPLE MESSAGE
========================= */

function showMessage(message) {

    alert(message);

}


/* =========================
   START WEBSITE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProducts(products);

        updateCart();

    }
);