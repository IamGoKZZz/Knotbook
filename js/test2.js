

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
    saveDoc(input, token);
}


function saveDoc(input, token) {
    

    // Make an API call to fetch subjects
    fetch('http://localhost:8002/admin/saveNote',{
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
            Swal.fire({
                text: "File uploaded successfully",
                icon: "success",
                confirmButtonText: "OK",
              })
            console.log('Response data:', data);
            
        })
        .catch(error => {
          
            Swal.fire({
                text: "File upload Failed",
                icon: "error",
                confirmButtonText: "OK",
              })
              console.error('Error fetching subjects:', error);
        });
 }
 
// Function to generate unique IDs for forms and their elements

function generateUniqueIDs(moduleNum) {
    return {
        formID: "pdfForm" + moduleNum,
        inputID: "pdfInput" + moduleNum,
        nameID: "pdfname" + moduleNum
    };
}

// Function to generate dropdown content
function generateDropdownContent(moduleNum) {
    var ids = generateUniqueIDs(moduleNum);
    return `
    <div class="dropdown-content">
        <a href="#">HTML</a>
        <a href="#">CSS</a>
        <a href="#">JS</a>
        <form id="${ids.formID}" enctype="multipart/form-data">
            <input type="text" id="${ids.nameID}" class="pdfname" required>
            <input type="file" id="${ids.inputID}" accept=".pdf" required>
            <button type="submit" onclick="saveFileName('${ids.nameID}',moduleNum')">Upload</button>
        </form>
    </div>`;
}

// Function to generate dropdown HTML
function generateDropdown(moduleNum) {
    return `
    <div class="dropdown">
        <button class="dropbtn" onclick="locSave('modNum', ${moduleNum})">mod${moduleNum}</button>
        ${generateDropdownContent(moduleNum)}
    </div>`;
}

// Generate dropdowns for modules
var dropdownContainer = document.getElementById("dropdownContainer");
for (var i = 1; i <= 5; i++) {
    dropdownContainer.innerHTML += generateDropdown(i);
}


// Loop through each module and attach event listener to its form
for (var i = 1; i <= 5; i++) {
    var form = document.getElementById("pdfForm" + i);
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const fileInput = this.querySelector('input[type="file"]');
        console.log("pdf input " + fileInput);
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a PDF file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const arrayBuffer = event.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            const CHUNK_SIZE = 0x8000; // 32k chunk sizes.
            let base64String = '';
            for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
                const chunk = uint8Array.subarray(i, i + CHUNK_SIZE);
                base64String += String.fromCharCode.apply(null, chunk);
            }
            base64String = btoa(base64String);
            localStorage.setItem("pdfString", base64String);
            const formData = new FormData();
         formData.append('pdfBase64', base64String);

            sendDataToServer(formData);
        };
        reader.readAsArrayBuffer(file);
    });
}

function saveFileName(pdfName,moduleNum){
    const uploadedFileName = document.getElementById(pdfName).value;
    console.log("note name = "+uploadedFileName)
    localStorage.setItem('uploadedFileName',uploadedFileName)
    console.log("module no" +moduleNum)
    localStorage.setItem('modNum',moduleNum)
  }
  function locSave(element, value){
    console.log("element  = "+element)
    console.log("value = "+value)
    localStorage.setItem(element,value)
  }