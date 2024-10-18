    // Event listener for the checkout button
    document.getElementById('checkout').addEventListener('click', calculateInvoice);

    // Function to calculate the invoice and taxes
    function calculateInvoice() {
        const taxRate = 0.15;  // 15% tax rate
        const cartRows = document.querySelectorAll('#cart-items tr');

        let subtotal = 0;
        cartRows.forEach(row => {
            const price = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('$', ''));
            const quantity = parseInt(row.querySelector('td:nth-child(5)').textContent);
            subtotal += price * quantity;
        });

        // Calculate taxes and total
        const taxes = subtotal * taxRate;
        const total = subtotal + taxes;

        // Update the Cart Summary
        document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)} JMD`;
        document.getElementById('cart-taxes').textContent = `$${taxes.toFixed(2)} JMD`;
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)} JMD`;

        // Show the invoice and proceed to checkout (this could redirect to an invoice page)
        alert(`Proceeding to Checkout. Total: $${total.toFixed(2)} JMD`);
    }

    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to display cart items in the cart table
    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = ''; // Clear the container before rendering

        let cartSubtotal = 0;

        // Loop through the cart items and render them in the table
        cartItems.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            cartSubtotal += subtotal;

            cartItemsContainer.innerHTML += `
                <tr>
                    <td><button onclick="removeFromCart(${index})">Remove</button></td>
                    <td><img src="${item.image}" width="100px" alt=""></td>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)} JMD</td>
                    <td>${item.quantity}</td>
                    <td>$${subtotal.toFixed(2)} JMD</td>
                </tr>
            `;
        });

        // Update the subtotal, taxes, and total in the summary section
        document.getElementById('cart-subtotal').innerText = `$${cartSubtotal.toFixed(2)} JMD`;
        const taxes = cartSubtotal * 0.15;  // Assuming 15% tax
        const total = cartSubtotal + taxes;
        document.getElementById('cart-taxes').innerText = `$${taxes.toFixed(2)} JMD`;
        document.getElementById('cart-total').innerText = `$${total.toFixed(2)} JMD`;
    }

    // Function to remove items from the cart
    function removeFromCart(index) {
        cartItems.splice(index, 1);  // Remove the item from the array
        localStorage.setItem('cartItems', JSON.stringify(cartItems));  // Update localStorage
        displayCartItems();  // Re-render the cart
    }

    // Display the cart items on page load
    displayCartItems();