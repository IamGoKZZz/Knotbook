document.getElementById('pdfForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('pdfInput');
    console.log("pdf input "+fileInput)
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a PDF file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        // Once the file is loaded, convert it to base64 string
        console.log("inside read")
         // Once the file is loaded, convert it to base64 string
         const arrayBuffer = event.target.result;
         const uint8Array = new Uint8Array(arrayBuffer);
         const CHUNK_SIZE = 0x8000; // 32k chunk sizes.
         let base64String = '';
 
         for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
             const chunk = uint8Array.subarray(i, i + CHUNK_SIZE);
             base64String += String.fromCharCode.apply(null, chunk);
         }
 
         base64String = btoa(base64String);
 
         // Now you can do whatever you want with the base64String, like sending it in a fetch request
         const formData = new FormData();
         formData.append('pdfBase64', base64String);

        // Save base64 string in local storage
        localStorage.setItem("pdfString", base64String);

        // Call the function to send data to the server
        sendDataToServer(formData);
    };
    
    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
});

// Function to send data to the server
function sendDataToServer(formData) {
    // Assuming `locSave` is a typo and should be `sendDataToServer`
    const input = {
        "department": localStorage.getItem("dept"),
        "semNum": Number(localStorage.getItem("semNum")),
        "subject": localStorage.getItem("sub"),
        "pdfString": localStorage.getItem("pdfString"),
        "modNum":Number(localStorage.getItem("modNum")),
        "noteName":localStorage.getItem("uploadedFileName")
    };
    const token = localStorage.getItem("jwt");

    // Call fetchSubjects function with input
    fetchSubjects(input, token);
}


function fetchSubjects(input, token) {
    // Make an API call to fetch subjects
    fetch('http://localhost:8002/admin/saveNote', {
        method: 'POST', // or 'GET', 'PUT', etc. depending on your API
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            // You may need to include additional headers depending on your API requirements
        },
        body: JSON.stringify(input) // Convert input object to JSON string
    })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            alert("File uploaded successfully");
            console.log('Response data:', data);
        })
        .catch(error => {
            alert("File upload failed");
            console.error('Error fetching subjects:', error);
        });
}
