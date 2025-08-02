let food = [];
let totalAmount = 0;

$(document).ready(function () {
  $(".menuBtn").click(function () {
    let quantity = $(this).siblings(".quantity");
    let foodName = $(this).closest(".foodItem").find(".foodItemName p:first-child").clone().children().remove().end().text().trim();
    let price = parseFloat($(this).closest(".foodItem").find(".price").text().trim());

    let count = Number(quantity.text());

    if ($(this).hasClass("plus")) {
      count++;
    } else if ($(this).hasClass("minus")) {
      count = Math.max(0, count - 1);
    }

    quantity.text(count);
    updateCart(foodName, count, price);
  });

  $("#clearCartBtn").click(function () {
    clearCart();
  });

  loadCartFromLocalStorage();

});

function clearCart() {
  food = [];
  totalAmount = 0;
  localStorage.removeItem("cartItems");
  localStorage.removeItem("totalAmount");
  localStorage.removeItem("totalPrice");
  displayCart();
  $(".quantity").text("0"); // Reset all + / − quantity counters in UI
}


function updateCart(foodName, quantity, price) {
  let existingItem = food.find(item => item.name === foodName);
  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    food.push({ name: foodName, quantity, price });
  }

  food = food.filter(item => item.quantity > 0);

  totalAmount = food.reduce((sum, item) => sum + item.quantity * item.price, 0);

  localStorage.setItem("cartItems", JSON.stringify(food));
  localStorage.setItem("totalAmount", totalAmount.toFixed(2));

  displayCart();
}

function displayCart() {
  let cartContent = $(".cartContentDiv");
  cartContent.empty();
  totalAmount = 0;

  if (food.length === 0) {
    cartContent.append('<h1 class="text-muted">Your Cart is Empty</h1>');
    $(".shoppingCart").removeClass("shoppingCartWithItems");
  } else {
    $(".shoppingCart").addClass("shoppingCartWithItems");

    food.forEach(item => {
      let itemTotal = item.quantity * item.price;
      totalAmount += itemTotal;

      cartContent.append(`
        <div class="row cartContentRow">
          <div class="col-10">
            <p>${item.name}</p>
            <p><i class="fas fa-rupee-sign"></i> ${item.price}</p>
          </div>
          <div class="col-2">
            <p class="text-muted-small"><i class="fas fa-rupee-sign"></i> ${itemTotal}</p>
            <span class="cartQuantity">Qty: ${item.quantity}</span>
          </div>
        </div>
        <hr class="cartHr">
      `);
    });
  }

  $(".totalAmountDiv").html(`
    <span class="totalAmountText">TOTAL AMOUNT:</span><br/>
    <i class="fas fa-rupee-sign"></i> ${totalAmount.toFixed(2)}
  `);
  localStorage.setItem("totalPrice", totalAmount);
  localStorage.setItem("totalPrice", totalAmount.toFixed(2));
  }

function loadCartFromLocalStorage() {
  const savedItems = localStorage.getItem("cartItems");
  const savedAmount = localStorage.getItem("totalAmount");

  if (savedItems) {
    food = JSON.parse(savedItems);
    totalAmount = parseFloat(savedAmount || 0);
    displayCart();
  }
}

function proceedToCheckout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  let totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0 || totalPrice <= 0) {
    alert("❌ Your cart is empty or total is invalid.");
    return;
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalPrice", totalPrice.toString());

  window.location.href = "checkout.html";
}
