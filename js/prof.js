function openPopup() {
    // Display the popup
    document.getElementById("popup").style.display = "block";

    // Trigger SweetAlert after the popup is displayed
    setTimeout(() => {
    }, 1000); // Adjust the delay as needed
}

function closePopup() {
    // Close the popup
    document.getElementById("popup").style.display = "none";
}

function logout() {
    // Perform logout action, e.g., redirect to logout page
    console.log("Logout clicked"); // Placeholder action
}

function saveDoc(input, token) {
    tokernExpiryCheck(token);

    // Make an API call to save the document
    fetch('http://localhost:8002/admin/saveNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(input)
    })
    .then(response => {
        if (response.ok) {
            // Display a success message using browser's alert
            alert("File uploaded successfully");
            generateDropdownContent(input["modNum"]);
            console.log('Document saved successfully');
        } else {
            // Display an error message using browser's alert
            alert("Duplicate name, File upload failed");
            console.error('Error saving document:', response.statusText);
        }
    })
    .catch(error => {
        // Display an error message using browser's alert
        alert("Duplicate name, File upload failed");
        console.error('Error saving document:', error);
    });
}
