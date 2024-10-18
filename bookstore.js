// Variables for navigation bar toggle
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}
if (close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}
document.getElementById('add-to-cart').addEventListener('click', function() {
    // Get product details
    const productName = document.querySelector('.single-pro-details h5').textContent;
    const productPrice = parseFloat(document.querySelector('.single-pro-details h2').textContent.replace('JMD', '').replace('$', ''));
    const productQuantity = parseInt(document.querySelector('.single-pro-details input[type="number"]').value);
    const productImage = document.querySelector('.single-pro-image img').src;

    // Create an item object
    const item = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        image: productImage
    };

    // Get the existing cart from localStorage or create an empty one
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the new item to the cart
    cartItems.push(item);

    // Save the updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Redirect to the cart page after adding the item
    window.location.href = 'cart.html';
});