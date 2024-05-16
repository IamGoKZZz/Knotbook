//localStorage.clear();
 var jwt = localStorage.getItem("jwt");
 console.log("Jwt= " + jwt);
 if (jwt != null) {
   // Check if token is expired
   const tokenParts = jwt.split('.');
   const payload = JSON.parse(atob(tokenParts[1]));
   const tokenExpiration = payload.exp * 1000; // Convert to milliseconds
   const currentTimestamp = new Date().getTime();
 
   console.log("Token expiration time: " + new Date(tokenExpiration));
   console.log("Current timestamp: " + new Date(currentTimestamp));
 
   if (currentTimestamp >= tokenExpiration) {
    console.log("token  expired")
     // Token is expired
    localStorage.removeItem("jwt");
     // Redirect to login page or perform any other action
     window.location.href = "./index.html";
   } else {
     // Token is still valid, redirect to another page
     console.log("Token is still valid.");
    window.location.href = "./index1.1.html";
   }
 }
 

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("email = "+email);

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8002/auth/signin");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      email: email,
      password: password,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      console.log("status = "+objects["statusCode"])
      if (objects["statusCode"] == "200") {
        localStorage.setItem("jwt", objects["token"]);
        localStorage.setItem("role",objects["role"]);
        localStorage.setItem("user-department",objects["department"]);
        localStorage.setItem("username",objects["name"]);

        var jwt = localStorage.getItem("jwt");
        console.log("jwt = "+jwt)
        Swal.fire({
          text: objects["message"],
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "./index1.1.html";
          }
        });
      } else {
        Swal.fire({
          text: objects["message"],
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  return false;
}