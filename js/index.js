function showSemester(sem,department) {
    console.log('Selected semester:', sem);
    if(department=='CSE'){
    switch (sem) {
      case 's8':
        console.log('Processing CSE department...');
        window.location.href = 'semesters/s8cse.html'
        localStorage.setItem("semNum", 8);
        localStorage.setItem("dept",department)
        break;
      case 's7':
        console.log('Processing Mechanical department...');
        window.location.href = 'semesters/s7cse.html'
        localStorage.setItem("semNum", 7);
        localStorage.setItem("dept",department)
        break;
      case 's6':
        console.log('Processing Civil department...');
        window.location.href = 'semesters/s6cse.html'
        localStorage.setItem("semNum", 6);
        localStorage.setItem("dept",department)
        break;
      case 's5':
        console.log('Processing ECE department...');
        window.location.href = 'semesters/s5cse.html'
        localStorage.setItem("semNum", 5);
        localStorage.setItem("dept",department)
        break;
      case 's4':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s4cse.html'
        localStorage.setItem("semNum", 4);
        localStorage.setItem("dept",department)
        break;
      case 's3':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s3cse.html'
        localStorage.setItem("semNum", 3);
        localStorage.setItem("dept",department)
         break; 
      case 's2':
        console.log('Processing EEE department...');
        window.location.href = 's2.html'
        localStorage.setItem("semNum", 2);
        localStorage.setItem("dept",department)
        break;  
       case 's1':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s1.html'
        localStorage.setItem("semNum", 1);
        localStorage.setItem("dept",department)
        break;
      default:
        console.log('Invalid department');
    }
  }
  if(department=='ME'){
    switch (sem) {
      case 's8':
        console.log('Processing CSE department...');
        window.location.href = 'semesters/s8mech.html'
        localStorage.setItem("semNum", 8);
        localStorage.setItem("dept",department)
        break;
      case 's7':
        console.log('Processing Mechanical department...');
        window.location.href = 'semesters/s7mech.html'
        localStorage.setItem("semNum", 7);
        localStorage.setItem("dept",department)
        break;
      case 's6':
        console.log('Processing Civil department...');
        window.location.href = 'semesters/s6mech.html'
        localStorage.setItem("semNum", 6);
        localStorage.setItem("dept",department)
        break;
      case 's5':
        console.log('Processing ECE department...');
        window.location.href = 'semesters/s5mech.html'
        localStorage.setItem("semNum", 5);
        localStorage.setItem("dept",department)
        break;
      case 's4':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s4mech.html'
        localStorage.setItem("semNum", 4);
        localStorage.setItem("dept",department)
        break;
      case 's3':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s3mech.html'
        localStorage.setItem("semNum", 3);
        localStorage.setItem("dept",department)
         break; 
      case 's2':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s1.html'
        localStorage.setItem("semNum", 2);
        localStorage.setItem("dept",department)
        break;  
       case 's1':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s1.html'
        localStorage.setItem("semNum", 1);
        localStorage.setItem("dept",department)
        break;
      default:
        console.log('Invalid department');
    }
  }
  if(department=='CE'){
    switch (sem) {
      case 's8':
        console.log('Processing CSE department...');
        window.location.href = 'semesters/s8civil.html'
        localStorage.setItem("semNum", 8);
        localStorage.setItem("dept",department)
        break;
      case 's7':
        console.log('Processing Mechanical department...');
        window.location.href = 'semesters/s7civil.html'
        localStorage.setItem("semNum", 7);
        localStorage.setItem("dept",department)
        break;
      case 's6':
        console.log('Processing Civil department...');
        window.location.href = 'semesters/s6civil.html'
        localStorage.setItem("semNum", 6);
        localStorage.setItem("dept",department)
        break;
      case 's5':
        console.log('Processing ECE department...');
        window.location.href = 'semesters/s5civil.html'
        localStorage.setItem("semNum", 5);
        localStorage.setItem("dept",department)
        break;
      case 's4':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s4civil.html'
        localStorage.setItem("semNum", 4);
        localStorage.setItem("dept",department)
        break;
      case 's3':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s3civil.html'
        localStorage.setItem("semNum", 3);
        localStorage.setItem("dept",department)
         break; 
      case 's2':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s1.html'
        localStorage.setItem("semNum", 2);
        localStorage.setItem("dept",department)
        break;  
       case 's1':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s1.html'
        localStorage.setItem("semNum", 1);
        localStorage.setItem("dept",department)
        break;
      default:
        console.log('Invalid department');
    }
  }
  if(department=='EEE'){
    switch (sem) {
      case 's8':
        console.log('Processing CSE department...');
        window.location.href = 'semesters/s8eee.html'
        localStorage.setItem("semNum", 8);
        localStorage.setItem("dept",department)
        break;
      case 's7':
        console.log('Processing Mechanical department...');
        window.location.href = 'semesters/s7eee.html'
        localStorage.setItem("semNum", 7);
        localStorage.setItem("dept",department)
        break;
      case 's6':
        console.log('Processing Civil department...');
        window.location.href = 'semesters/s6eee.html'
        localStorage.setItem("semNum", 6);
        localStorage.setItem("dept",department)
        break;
      case 's5':
        console.log('Processing ECE department...');
        window.location.href = 'semesters/s5eee.html'
        localStorage.setItem("semNum", 5);
        localStorage.setItem("dept",department)
        break;
      case 's4':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s4eee.html'
        localStorage.setItem("semNum", 4);
        localStorage.setItem("dept",department)
        break;
      case 's3':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s3eee.html'
        localStorage.setItem("semNum", 3);
        localStorage.setItem("dept",department)
         break; 
      case 's2':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s1.html'
        localStorage.setItem("semNum", 2);
        localStorage.setItem("dept",department)
        break;  
       case 's1':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s1.html'
        localStorage.setItem("semNum", 1);
        localStorage.setItem("dept",department)
        break;
      default:
        console.log('Invalid department');
    }
  }
  if(department=='ECE'){
    switch (sem) {
      case 's8':
        console.log('Processing CSE department...');
        window.location.href = 'semesters/s8ec.html'
        localStorage.setItem("semNum", 8);
        localStorage.setItem("dept",department)
        break;
      case 's7':
        console.log('Processing Mechanical department...');
        window.location.href = 'semesters/s7ec.html'
        localStorage.setItem("semNum", 7);
        localStorage.setItem("dept",department)
        break;
      case 's6':
        console.log('Processing Civil department...');
        window.location.href = 'semesters/s6ec.html'
        localStorage.setItem("semNum", 6);
        localStorage.setItem("dept",department)
        break;
      case 's5':
        console.log('Processing ECE department...');
        window.location.href = 'semesters/s5ec.html'
        localStorage.setItem("semNum", 5);
        localStorage.setItem("dept",department)
        break;
      case 's4':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s4ec.html'
        localStorage.setItem("semNum", 4);
        localStorage.setItem("dept",department)
        break;
      case 's3':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s3ec.html'
        localStorage.setItem("semNum", 3);
        localStorage.setItem("dept",department)
         break; 
      case 's2':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s1.html'
        localStorage.setItem("semNum", 2);
        localStorage.setItem("dept",department)
        break;  
       case 's1':
        console.log('Processing EEE department...');
        window.location.href = 'semesters/s1.html'
        localStorage.setItem("semNum", 1);
        localStorage.setItem("dept",department)
        break;
      default:
        console.log('Invalid department');
    }
  }
}
  function locSave(element, value){
    localStorage.setItem(element,value)
  }

  function openPopup() {
    // Simulate fetching username and role from database
    const username = localStorage.getItem("username"); // Replace with actual fetched username
    console.log("username="+username);
    const role = localStorage.getItem("role"); // Replace with actual fetched role
    const dept = localStorage.getItem("user-department"); // Replace with actual fetched role

    document.getElementById("username").textContent = username;
    document.getElementById("role").textContent = role;
    document.getElementById("dept").textContent = dept;

    // Simulate fetching user list from database
  
    document.getElementById("popup").style.display = "block";
  }
  
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
  
  function logout() {
    // Perform logout action, e.g., redirect to logout page
    console.log("Logout clicked"); // Placeholder action
    localStorage.clear();
    window.location.href = "./index.html";
  }
  function checkUserRole() {
    // Assuming you have stored the user's role in a variable called 'userRole'
    console.log("inside user role:");
    var userRole = localStorage.getItem("role"); // Example role
    console.log("role:"+userRole)
    var usersListLink = document.getElementById("userslist");
    if (userRole === "SUPER_ADMIN") {
        usersListLink.style.display = "block"; // Show Users List link
    } else {
        usersListLink.style.display = "none"; // Hide Users List link
    }
}

// Call the function when the page loads
window.onload = checkUserRole;