// This JS defines a function that redirects to the login page, 
// adds event listeners to validate the username and password fields, and handles form submission.
function redirectToLogin() {
    window.location.href = "../html/login.html";
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.querySelector("#register-form");
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const successMessage = document.querySelector("#success-message");
    
    // Define the validation functions
    function validateUsername() {
      const usernameValue = usernameInput.value;
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(usernameValue)) {
        usernameInput.setCustomValidity("Username can only contain letters, numbers, and underscores.");
      } else {
        usernameInput.setCustomValidity("");
      }
    }
    
    function validatePassword() {
      const passwordValue = passwordInput.value;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(passwordValue)) {
        passwordInput.setCustomValidity("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
      } else {
        passwordInput.setCustomValidity("");
      }
    }
    
    // Add event listeners to perform validation as the user types or blurs from the fields
    usernameInput.addEventListener("input", validateUsername);
    passwordInput.addEventListener("input", validatePassword);
    usernameInput.addEventListener("blur", validateUsername);
    passwordInput.addEventListener("blur", validatePassword);
    
    // Add event listener to handle form submission
    registerForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      // Perform final validation on submit
      validateUsername();
      validatePassword();
      
      if (registerForm.checkValidity()) {
        // TODO: Submit form data to server using AJAX or Fetch (wait for study)
        // If successful, redirect to login page

        successMessage.classList.remove("d-none");
        setTimeout(redirectToLogin, 2000);
      }
      
      registerForm.classList.add("was-validated");
    });
  });
  