const input = {
    "semNum":1
};
//const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb3Bpa2FuYXRoMTlAZ21haWwuY29tIiwiaWF0IjoxNzEzNTE0MzE0LCJleHAiOjE3MTM2MDA3MTR9.qSHqb3EuKx5pSX2mlob07fwf3yfPTeIXn2gyb4bz9Us";
const token = localStorage.getItem("jwt");
console.log("token = "+token)
// Call fetchSubjects function with input
fetchSubjects(input);
// subjects.js

// Function to fetch subjects from the API
function fetchSubjects(input) {
   // Make an API call to fetch subjects
   fetch('http://localhost:8002/user/getSubjects',{
       method: 'POST', // or 'GET', 'PUT', etc. depending on your API
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
           // You may need to include additional headers depending on your API requirements
       },
       body: JSON.stringify(input) // Convert input object to JSON string
   })
       .then(response => response.json())
       .then(data => {
           // Call a function to render subjects
           renderSubjects(data);
       })
       .catch(error => {
           console.error('Error fetching subjects:', error);
       });
}
