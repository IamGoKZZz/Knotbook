


const token = localStorage.getItem("jwt");

//const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb3Bpa2FuYXRoMTlAZ21haWwuY29tIiwiaWF0IjoxNzEzNzEzODI0LCJleHAiOjE3MTM3MTc0MjR9.kdCVKh0IpsZeMub1qrPHi9ybDnAmHCsTdZ89XI9ph6Y";

function generateDropdownContent(moduleNum) {
    var ids = generateUniqueIDs(moduleNum);
    const input = {
        "department": localStorage.getItem("dept"),
        "semNum": Number(localStorage.getItem("semNum")),
        "subject": localStorage.getItem("sub"),
        "modNum": Number(moduleNum)
    };
    tokernExpiryCheck(token)
    // Fetch data from API
    return fetch('http://localhost:8002/adminuser/getNotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Call a function to render subjects with the fetched data
            const dropdownContent = renderDropdownContent(data, ids, moduleNum);
            // Append plus icon to the dropdown container

            return dropdownContent;
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
        });
}

function renderDropdownContent(data, ids, moduleNum) {
    console.log("data = " + data)
    let dropdownContent = `<div class="dropdown-content">`;

    // Loop through the data and create dropdown items
    data.forEach(item => {
        dropdownContent += `
            <div class="note-item">
                <span>${item.noteName}</span>
                <div class="button-container">
                    <button class="download-icon" onclick="downloadPDFFromBase64('${item.pdfString}','${item.noteName}')">
                        <img src="../img/downlo.png" alt="Download" height=24px width=24px>
                    </button>`;
        
        // Check if the user is an admin
        if(localStorage.getItem("role") === "ADMIN" || localStorage.getItem("role") === "SUPER_ADMIN") {
            // If the user is an admin, include the delete icon button
            dropdownContent += `
                <button class="delete-icon" onclick="deleteNote('${item.noteId}')">
                    <img src="../img/delete_icon.png" alt="Delete">
                </button>`;
        }
        
        dropdownContent += `</div></div>`;
    });

    // Add a container for the upload form
    dropdownContent += `<div id="uploadFormContainer"></div>`;

    // Add form for file upload
    dropdownContent += `
        <form id="${ids.formID}" enctype="multipart/form-data" style="display: none;">
            <input type="text" id="${ids.nameID}" class="pdfname" required>
            <input type="file" id="${ids.inputID}" accept=".pdf" required>
            <button type="submit" onclick="saveFileName('${ids.nameID}', '${moduleNum}')">Upload</button>
        </form>`;
        
    // Close the dropdown content container
    dropdownContent += `</div>`;

    // Add event listener to the form after it is generated
    setTimeout(() => {
        const form = document.getElementById(ids.formID);
        if (form) {
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
                    const formData = new FormData();
                    formData.append('pdfBase64', base64String);

                    sendDataToServer(formData);
                };
                reader.readAsArrayBuffer(file);
            });
        }
    }, 0);
   
    return dropdownContent;
}



function generateUniqueIDs(moduleNum) {
    return {
        formID: "pdfForm" + moduleNum,
        inputID: "pdfInput" + moduleNum,
        nameID: "pdfname" + moduleNum
    };
}

function generateDropdown(moduleNum) {
    var dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    
    // Create module button
    var button = document.createElement('button');
    button.className = 'dropbtn';
    button.textContent = 'Module ' + moduleNum;
    dropdown.appendChild(button); // Append the button to the dropdown initially

    console.log("role",+localStorage.getItem("role"));

    // Add plus icon next to the module button
    var plusIcon = generatePlusIcon("pdfForm" + moduleNum);
    console.log("user dept = "+ localStorage.getItem("user-department") );
    if(((localStorage.getItem("role")=="ADMIN" && localStorage.getItem("user-department") == localStorage.getItem("dept"))) || (localStorage.getItem("role")=="SUPER_ADMIN")) {
        console.log("role",+localStorage.getItem("role"));
    dropdown.appendChild(plusIcon);
    }

    // Add a container for the dropdown content
    var dropdownContentContainer = document.createElement('div');
    dropdownContentContainer.className = 'dropdown-content';

    // Add upload form
    var uploadForm = generateUploadForm("pdfForm" + moduleNum, moduleNum);
    dropdownContentContainer.appendChild(uploadForm);

    dropdown.appendChild(dropdownContentContainer);

    // Add event listener to plus icon
    plusIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the button
        toggleUploadForm("pdfForm" + moduleNum);
    });
    
    // Add event listener to module button
    button.addEventListener('click', function() {
        generateDropdownContent(moduleNum)
            .then(content => {
                // Replace the dropdown content instead of the entire dropdown container
                dropdownContentContainer.innerHTML = content;
            })
            .catch(error => {
                console.error('Error generating dropdown content:', error);
            });
    });

    return dropdown;
}
// Function to generate the upload form
function generateUploadForm(formId, moduleNum) {
    var form = document.createElement('form');
    form.id = formId;
    form.enctype = 'multipart/form-data';
    form.style.display = 'none';

    var inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.id = 'pdfname' + moduleNum;
    inputName.className = 'pdfname';
    inputName.required = true;

    var inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.id = 'pdfInput' + moduleNum;
    inputFile.accept = '.pdf';
    inputFile.required = true;

    var button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Upload';
    button.addEventListener('click', function() {
        saveFileName('pdfname' + moduleNum, moduleNum);
    });
    setTimeout(() => {
        const form = document.getElementById(formId);
        if (form) {
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
                    const formData = new FormData();
                    formData.append('pdfBase64', base64String);

                    sendDataToServer(formData);
                };
                reader.readAsArrayBuffer(file);
            });
        }
    }, 0);
   
    form.appendChild(inputName);
    form.appendChild(inputFile);
    form.appendChild(button);

    return form;
}


// Generate dropdowns for modules
var dropdownContainer = document.getElementById("dropdownContainer");
for (var i = 1; i <= 5; i++) {
    dropdownContainer.appendChild(generateDropdown(i));
}


function locSave(element, value) {
    console.log("element  = " + element)
    console.log("value = " + value)
    localStorage.setItem(element, value)
}
function saveFileName(pdfName, moduleNum) {
    const uploadedFileName = document.getElementById(pdfName).value; // Retrieve the value of the input field
    console.log("note name = " + uploadedFileName);
    localStorage.setItem('uploadedFileName', uploadedFileName);
    console.log("module no: " + moduleNum);
    localStorage.setItem('modNum', moduleNum);
}
// for (var i = 1; i <= 5; i++) {
//     var form = document.getElementById("pdfForm" + i);
//     if(form){
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const fileInput = this.querySelector('input[type="file"]');
//         console.log("pdf input " + fileInput);
//         const file = fileInput.files[0];
//         if (!file) {
//             alert('Please select a PDF file.');
//             return;
//         }
//         const reader = new FileReader();
//         reader.onload = function(event) {
//             const arrayBuffer = event.target.result;
//             const uint8Array = new Uint8Array(arrayBuffer);
//             const CHUNK_SIZE = 0x8000; // 32k chunk sizes.
//             let base64String = '';
//             for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
//                 const chunk = uint8Array.subarray(i, i + CHUNK_SIZE);
//                 base64String += String.fromCharCode.apply(null, chunk);
//             }
//             base64String = btoa(base64String);
//             localStorage.setItem("pdfString", base64String);
//             const formData = new FormData();
//          formData.append('pdfBase64', base64String);

//             sendDataToServer(formData);
//         };
//         reader.readAsArrayBuffer(file);
//     });
// }
//}
function sendDataToServer(formData) {
    // Assuming `locSave` is a typo and should be `sendDataToServer`
    const input = {
        "department": localStorage.getItem("dept"),
        "semNum": Number(localStorage.getItem("semNum")),
        "subject": localStorage.getItem("sub"),
        //"pdfString": localStorage.getItem("pdfString"),
        "pdfString":formData.get("pdfBase64"),
        "modNum":Number(localStorage.getItem("modNum")),
        "noteName":localStorage.getItem("uploadedFileName")
    };
    const token = localStorage.getItem("jwt");
    console.log(input)
    // Call fetchSubjects function with input
    saveDoc(input, token);
}

 function tokernExpiryCheck(jwt){
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
   } 
   else {
     // Token is still valid, redirect to another page
     console.log("Token is still valid.");
   }
 }
 function generatePlusIcon(formId) {
    
    console.log("form id = "+formId);
    const plusIcon = document.createElement('div');
    const img = document.createElement('img');
    img.src = '../img/file.png'; // Replace 'img/file.png' with the actual path to your plus icon image
    img.alt = 'Plus Icon';
    img.style.width = '16px'; // Adjust the width of the image
    img.style.height = '16px'; // Adjust the height of the image
    plusIcon.appendChild(img);
    plusIcon.className = 'plus-icon';
    // Add click event listener to the plus icon
    // plusIcon.addEventListener('click', function() {
    //     // Handle click event for the plus icon (e.g., open a modal, perform an action, etc.)
    //     console.log('Plus icon clicked');
    //     toggleUploadForm(formId);
    // });
    return plusIcon;
}

function toggleUploadForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}
function getSubject(){
    const sub = localStorage.getItem("sub")
    return sub;
}
function deleteNote(noteId) {
    // Display a confirmation popup
    const confirmed = window.confirm('Are you sure? You won\'t be able to revert this!');

    if (confirmed) {
        const input = {
            "noteId": Number(noteId)
        };
        // Proceed with your logic after user confirms
        tokernExpiryCheck(token);
        // Fetch data from API
        fetch('http://localhost:8002/admin/deleteNote', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(data => {
            // Display a success message
            alert('Your note has been deleted.');
            // Optionally, you can perform additional actions here if needed
        })
        .catch(error => {
            console.error('Error deleting note:', error);
            // Display an error message if deletion fails
            alert('Failed to delete note.');
        });
    }
}

