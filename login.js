
let users = [
    { username: "user1", password: "password123" },
    { username: "user2", password: "securepass" },
    { username: "user3", password: "bookstorepass"}
];

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem('users'));
}

function validateLogin(username, password) {
    const storedUsers = JSON.parse(localStorage.getItem('users'));

    return storedUsers.some(user => user.username === username && user.password === password);
}

let loginAttempts = 0;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get the values entered by the user
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    // Validate login
    if (validateLogin(enteredUsername, enteredPassword)) {
        alert("Login successful!");
        window.location.href = "mainpage.html"; // Redirect to the product page
    } else {
        loginAttempts++;
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = `Invalid username or password. Attempt ${loginAttempts}/3`;

        // If 3 failed attempts, redirect to error page
        if (loginAttempts >= 3) {
            window.location.href = "error.html";
        }
    }
});



