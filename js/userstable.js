const token = localStorage.getItem("jwt")
getUsersList();
function getUsersList() {
    // Fetch data from API
    return fetch('http://localhost:8002/auth/usersList', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
      
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        // Create a table element
        const table = document.createElement('table');

        // Create table header
        const headerRow = document.createElement('tr');
        ['Name', 'Email', 'Role', 'Department','Delete'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Populate table rows with data
        data.forEach(user => {
            const row = document.createElement('tr');
            ['name', 'email', 'role', 'department','action'].forEach(fieldName => {
                const cell = document.createElement('td');
                if (fieldName === 'role') {
                    // If the current field is 'role', display the role value and add an image button to change the role
                    const roleText = document.createElement('span');
                    roleText.textContent = user[fieldName];
                    roleText.classList.add('role-text'); 
                    const changeRoleImg = document.createElement('img');
                    changeRoleImg.src = '../img/change-button.png'; // Set the path to your image
                    changeRoleImg.alt = 'Change Role';
                    changeRoleImg.classList.add('role-change-button');
                    changeRoleImg.onclick = () => {
                        // Call a function to handle role change
                        changeUserRole(user.email, user.role);
                    };
                    cell.appendChild(roleText);
                    cell.appendChild(changeRoleImg);
                } else {
                    // Otherwise, just display the field value
                    cell.textContent = user[fieldName];

                }
                if (fieldName === 'action') {
                const deleteIcon = document.createElement('img');
                deleteIcon.src = '../img/delete_icon.png'; // Set the path to your image
                cell.appendChild(deleteIcon);
                deleteIcon.onclick = () => {
                const confirmed = window.confirm('Are you sure? You want to delete user!');
                if (confirmed) {
                   
                   deleteUser(user.id);
                }
                };
                }
                row.appendChild(cell);
                 
            });
          
            table.appendChild(row);
        });

        // Create a popup
        const popup = document.createElement('div');
        popup.classList.add('popup');
        
        // Append the table to the popup
        popup.appendChild(table);

        // Append the popup to the container element
        const container = document.getElementById('popup-container');
        container.innerHTML = ''; // Clear previous popup if any
        container.appendChild(popup);
        
        // Show the popup
        openPopup();
    })
    .catch(error => {
        console.error('Error fetching user list:', error);
    });
}
function changeUserRole(email, role) {
    // Get the cell containing the "Change Role" button
    const cell = event.target.parentNode;

    // Create a dropdown menu for role selection
    const dropdown = document.createElement('select');

    // Populate the dropdown with role options
    const roles = ['USER', 'ADMIN', 'SUPER_ADMIN']; // Example role options
    roles.forEach(roleOption => {
        const option = document.createElement('option');
        option.value = roleOption;
        option.textContent = roleOption;
        dropdown.appendChild(option);
    });

    // Set the initial selected role
    dropdown.value = role;

    // Event listener to handle role selection
    dropdown.addEventListener('change', function() {
        const selectedRole = this.value;
        // Perform the role change action with the selected role
        performRoleChange(email, selectedRole);
    });

    // Replace the "Change Role" button with the dropdown menu
    cell.innerHTML = '';
    cell.appendChild(dropdown);

    // Focus on the dropdown for immediate selection
    dropdown.focus();
}

function performRoleChange(email, role) {
    const input = {
        "email": email,
        "role": role
    };
    // Call the API to change the user's role
    fetch('http://localhost:8002/auth/roleChange', {
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
            getUsersList();
            // Optionally, update the UI or display a message after role change
        })
        .catch(error => {
            console.error('Error in changing role:', error);
        });
}

function openPopup() {
    document.getElementById("popup-container").style.display = "block";
}

function deleteUser(userId) {
    const input = {
        "userId": userId
        
    };
    // Call the API to change the user's role
    fetch('http://localhost:8002/auth/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            getUsersList();
            // Optionally, update the UI or display a message after role change
        })
        .catch(error => {
            console.error('Error in changing role:', error);
        });
}
