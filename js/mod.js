// script.js
document.addEventListener("DOMContentLoaded", function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            const dropdownContent = this.querySelector('.dropdown-content');
            const selectedOption = dropdownContent.querySelector('a:hover').innerText;
            console.log(selectedOption);
        });
    });
});
function locSave(element, value){
    console.log("element  = "+element)
    console.log("value = "+value)
    localStorage.setItem(element,value)
  }

  function saveFileName(){
    const uploadedFileName = document.getElementById('pdfname').value;
    console.log("note name = "+uploadedFileName)
    localStorage.setItem('uploadedFileName',uploadedFileName)
  }
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
        renderDropdown(data);
    })
    .catch(error => {
        console.error('Error fetching subjects:', error);
    });
}
function renderDropdown(data) {
    const dropdownContent = document.querySelector('.dropdown-content');
    // Clear previous dropdown content
    dropdownContent.innerHTML = '';

    // Loop through the data and create dropdown items
    data.forEach(item => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = item.noteName; // Assuming 'subject' is the key in your data
        dropdownContent.appendChild(link);
    });

    // Add event listener to handle file upload
    const uploadButton = document.createElement('button');
    uploadButton.textContent = 'Upload';
    uploadButton.addEventListener('click', saveFileName);
    dropdownContent.appendChild(uploadButton);
}