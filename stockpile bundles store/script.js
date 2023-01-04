const addToCartButtons = document.querySelectorAll('.add-to-cart');

for (const button of addToCartButtons) {
  button.addEventListener('click', addToCart);
}

function addToCart(event) {
  const button = event.target;
  const bundle = button.parentElement;
  const title = bundle.querySelector('h4').textContent;
  const price = bundle.querySelector('.price').textContent;

  const cartItem = {
    title: title,
    price: price,
  };

  addItemToCart(cartItem);
  updateCartTotal();
}

function addItemToCart(item) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.querySelector('.cart-items');
  const cartItemNames = cartItems.querySelectorAll('.cart-item-title');
  for (const cartItemName of cartItemNames) {
    if (cartItemName.textContent === item.title) {
      alert('This item is already added to the cart');
      return;
    }
  }

  const cartRowContents = `
    <div class="cart-item cart-column">
      <span class="cart-item-title">${item.title}</span>
    </div>
    <span class="cart-price cart-column">${item.price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
  cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
}

function updateCartTotal() {
    // ...
    total = total + (price * quantity);
  }
  
  function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }
  
  function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  }
  
  const purchaseButton = document.querySelector('.btn-purchase');
  purchaseButton.addEventListener('click', purchaseClicked);
  
  function purchaseClicked() {
    alert('Thank you for your purchase!');
    const cartItems = document.querySelector('.cart-items');
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
  }