// Listen for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the registration form element
    const registrationForm = document.getElementById("registration");
    // Get the login form element
    const loginForm = document.getElementById("login");
  
    // Add an event listener for the registration form submission
    registrationForm.addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Clear any previous error messages
      clearErrors();
  
      // Retrieve and normalize username input
      const username = this.username.value.trim().toLowerCase();
      // Retrieve and normalize email input
      const email = this.email.value.trim().toLowerCase();
      // Retrieve password input
      const password = this.password.value;
      // Retrieve password confirmation input
      const passwordCheck = this.passwordCheck.value;
      // Check if terms checkbox is checked
      const terms = this.terms.checked;
  
      // Initialize validation flag
      let valid = true;
      // Initialize error messages array
      let errors = [];
  
      // Validate username for minimum length and character restrictions
      if (
        !username ||
        username.length < 4 ||
        /[^a-z0-9]/i.test(username) ||
        new Set(username).size < 2
      ) {
        // Add username error message
        errors.push(
          "Username must be at least four characters long, contain only alphanumeric characters, and include at least two unique characters."
        );
        // Focus on username field
        this.username.focus();
        // Set validation flag to false
        valid = false;
      }
  
      // Check if username is unique in localStorage
      if (localStorage.getItem(username)) {
        // Add unique username error message
        errors.push("That username is already taken.");
        // Focus on username field
        this.username.focus();
        // Set validation flag to false
        valid = false;
      }
  
      // Validate email for format and domain restrictions
      if (
        !email ||
        !/\S+@\S+\.\S+/.test(email) ||
        email.endsWith("@example.com")
      ) {
        // Add email error message
        errors.push(
          'Please enter a valid email address that is not from "example.com".'
        );
        // Focus on email field
        this.email.focus();
        // Set validation flag to false
        valid = false;
      }
  
      // Validate password for length, character variety, and restricted substrings
      if (
        password.length < 12 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[^\w\s]/.test(password) ||
        /password/i.test(password) ||
        password.includes(username)
      ) {
        // Add password error message
        errors.push(
          'Password must be at least 12 characters long and include uppercase, lowercase, a number, and a special character. It cannot contain the word "password" or your username.'
        );
        // Focus on password field
        this.password.focus();
        // Set validation flag to false
        valid = false;
      }
  
      // Check if passwords match
      if (password !== passwordCheck) {
        // Add password mismatch error message
        errors.push("Passwords do not match.");
        // Focus on password check field
        this.passwordCheck.focus();
        // Set validation flag to false
        valid = false;
      }
  
      // Check if terms and conditions are agreed upon
      if (!terms) {
        // Add terms agreement error message
        errors.push("You must agree to the terms.");
        // Focus on terms checkbox
        this.terms.focus();
        // Set validation flag to false
        valid = false;
      }
  
      // Handle form submission if validation passes
      if (!valid) {
        // Display errors
        displayErrors(errors);
      } else {
        // Store user data in localStorage
        localStorage.setItem(
          username,
          JSON.stringify({ username, email, password })
        );
        // Clear the form fields
        clearForm(this);
        // Display success message
        displaySuccess("Registration successful!");
      }
    });
  
    // Add an event listener for the login form submission
    loginForm.addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Clear any previous error messages
      clearErrors();
  
      // Retrieve and normalize username input
      const username = this.username.value.trim().toLowerCase();
      // Retrieve password input
      const password = this.password.value;
  
      // Initialize validation flag
      let valid = true;
      // Initialize error messages array
      let errors = [];
  
      // Validate existence of username
      if (!username) {
        // Add username blank error message
        errors.push("Username cannot be blank.");
        // Focus on username field
        this.username.focus();
        // Set validation flag to false
        valid = false;
      } else if (!localStorage.getItem(username)) {
        // Add username existence error message
        errors.push("Username does not exist.");
        // Focus on username field
        this.username.focus();
        // Set validation flag to false
        valid = false;
      }
  
      // Retrieve user data from localStorage
      const userData = JSON.parse(localStorage.getItem(username));
      // Validate password correctness
      if (userData && userData.password !== password) {
        // Add incorrect password error message
        errors.push("Incorrect password.");
        // Focus on password field
        this.password.focus();
        // Set validation flag to false
        valid = false;
      }
  
      // Handle form submission if validation passes
      if (!valid) {
        // Display errors
        displayErrors(errors);
      } else {
        // Clear the form fields
        clearForm(this);
        // Prepare success message
        let message = "Login successful!";
        // Modify success message if 'Keep me logged in' is checked
        if (this.persist.checked) {
          message += " You will be kept logged in.";
        }
        // Display success message
        displaySuccess(message);
      }
    });
  
    // Function to display error messages
    function displayErrors(errors) {
      // Get the error display element
      const errorDisplay = document.getElementById("errorDisplay");
      // Set the error messages as HTML
      errorDisplay.innerHTML = errors.join("<br>");
      // Make the error display visible
      errorDisplay.style.display = "block";
    }
  
    // Function to clear error messages
    function clearErrors() {
      // Get the error display element
      const errorDisplay = document.getElementById("errorDisplay");
      // Clear the inner HTML of the error display
      errorDisplay.innerHTML = "";
      // Hide the error display
      errorDisplay.style.display = "none";
    }
  
    // Function to clear all form fields
    function clearForm(form) {
      // Iterate over each form element and clear its value
      Array.from(form.elements).forEach((element) => (element.value = ""));
    }
  
    // Function to display success messages
    function displaySuccess(message) {
      // Get the error display element
      const errorDisplay = document.getElementById("errorDisplay");
      // Set the success message as HTML
      errorDisplay.innerHTML = message;
      // Make the error display visible
      errorDisplay.style.display = "block";
      // Set the display color to green for success
      errorDisplay.style.color = "green";
    }
  });