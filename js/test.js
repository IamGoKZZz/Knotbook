// login.js

// Function to handle login form submission
function loginUser() {
    // Get the username and password from the form fields
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    // Make an AJAX request to the Java backend
    $.ajax({
        url: 'http://localhost:8081/auth/api/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username: username,email: email, password: password }),
        success: function(response) {
            // Handle successful login response
            console.log(response);
            alert(response); // Display a success message
        },
        error: function(xhr, status, error) {
            // Handle error response
            console.error(error);
            alert('Login failed. Please check your credentials.'); // Display an error message
        }
    });
}

// Attach an event listener to the login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    loginUser(); // Call the loginUser function to handle the login process
});
