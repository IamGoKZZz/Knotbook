// Example input object
// const input = {
//      "semNum":1
// };
// //const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb3Bpa2FuYXRoMTlAZ21haWwuY29tIiwiaWF0IjoxNzEzNTE0MzE0LCJleHAiOjE3MTM2MDA3MTR9.qSHqb3EuKx5pSX2mlob07fwf3yfPTeIXn2gyb4bz9Us";
// const token = localStorage.getItem("jwt");
// console.log("token = "+token)
// // Call fetchSubjects function with input
// fetchSubjects(input);
// // subjects.js

// // Function to fetch subjects from the API
// function fetchSubjects(input) {
//     // Make an API call to fetch subjects
//     fetch('http://localhost:8002/user/getSubjects',{
//         method: 'POST', // or 'GET', 'PUT', etc. depending on your API
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//             // You may need to include additional headers depending on your API requirements
//         },
//         body: JSON.stringify(input) // Convert input object to JSON string
//     })
//         .then(response => response.json())
//         .then(data => {
//             // Call a function to render subjects
//             renderSubjects(data);
//         })
//         .catch(error => {
//             console.error('Error fetching subjects:', error);
//         });
// }

// // Function to render subjects
// function renderSubjects(subjects) {
//     // Get the container where subjects will be displayed
//     const container = document.querySelector('.main .left');

//     // Clear any existing content
//     container.innerHTML = '';
//     console.log("subjectcs = "+subjects[0]);

//     // Iterate over each subject and create a link
//     subjects.forEach(subject => {
//         const subjectLink = document.createElement('a');
//         subjectLink.href = subject; // Assuming each subject object has a 'url' property
//         subjectLink.textContent = subject; // Assuming each subject object has a 'name' property
//           // Add onclick action to each subject link
//           subjectLink.onclick = function() {
//             console.log("inside on clivk")
//             const noteInput = {
//                 "department":"CSE",
//                 "semNum":1,
//             "subject":"TOC"
//             }
//             getNotes(noteInput);
//             return false;
//             // window.location.href = subject.url;
//         };



//         const subjectDiv = document.createElement('div');
//         subjectDiv.classList.add('hello');
//         subjectDiv.appendChild(subjectLink);
//         // Append the subject to the container
//         container.appendChild(subjectDiv);
//     });
// }

// // Call fetchSubjects function to fetch and render subjects when the page loads
// document.addEventListener('DOMContentLoaded', fetchSubjects(input));


function getNotes(noteInput){
    console.log("inside get notes")

// Make an API call to fetch subjects
fetch('http://localhost:8002/user/getNotes',{
    method: 'POST', // or 'GET', 'PUT', etc. depending on your API
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        // You may need to include additional headers depending on your API requirements
    },
    body: JSON.stringify(noteInput) // Convert input object to JSON string
})
    .then(response => response.json())
    .then(data => {
        // Call a function to render subjects
        console.log(data)
    })
    .catch(error => {
        console.error('Error fetching subjects:', error);
    });
}

 function locSave(element, value){
    console.log("val="+value)
    localStorage.setItem(element,value)
  }

  function openPopup(subject) {

     // Calculate the position of the popup
     const popupWidth = 1000; // Adjust as needed
     const popupHeight = 800; // Adjust as needed
     const left = (window.innerWidth - popupWidth) / 2;
     const top = (window.innerHeight - popupHeight) / 2;
 
    // Open a new window with the specified HTML file
    //const popupWindow = window.open('/test2.html', 'Popup', `width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}, menubar=no`);
    //const popupWindow = window.open('/test2.html','popup',`width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}, menubar=no`);
    const popupWindow = window.open('/test2.html', 'Popup', `width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}, menubar=no, resizable=no`);
    // Focus on the new window if it exists
    if (popupWindow) {
        popupWindow.focus();
    }
    locSave('sub',subject);
}
