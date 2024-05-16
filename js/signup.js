document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.my-login-validation');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("inside on click")
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var dept = document.getElementById('department').value;
       // var role = "USER";
        var data = {
            name: name,
            email: email,
            password: password,
            role:"USER",
            department:dept
        };
        console.log("input = "+data)

        fetch('http://localhost:8002/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                Swal.fire({
                    text: "Signup failed. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                  }); 
            }
            
            Swal.fire({
                text: "Signup successful!",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "./index.html";
                }
              });
              return response.json();
        })
        .then(data => {
            console.log(data);
           // alert("Signup successful!");
            // Optionally, redirect the user to another page
            // window.location.href = 'another-page.html';
        })
        .catch(error => {
            console.error('There was an error!', error);
            //alert("Signup failed. Please try again.");
        });
    });
});
