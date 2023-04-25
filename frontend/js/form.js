// This JS defines a function that redirects to the login page,
// Adds event listeners to validate the username and password fields, and handles form submission.
function redirectToLogin() {
  window.location.href = "../html/login.html";
}

// Wait for the DOM to load before executing the code inside
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the form and input elements
  const registerForm = document.querySelector("#register-form");
  const usernameInput = document.querySelector("#username");
  const passwordInput = document.querySelector("#password");
  const successMessage = document.querySelector("#success-message");

  // Define the validation functions
  function validateUsername() {
    // Get the value of the username input
    const usernameValue = usernameInput.value;
    // Define a regular expression that only allows letters, numbers, and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    // If the input doesn't match the regex, set a custom error message
    if (!usernameRegex.test(usernameValue)) {
      usernameInput.setCustomValidity(
        "Username can only contain letters, numbers, and underscores."
      );
    } else {
      // Otherwise, clear any existing error message
      usernameInput.setCustomValidity("");
    }
  }

  function validatePassword() {
    // Get the value of the password input
    const passwordValue = passwordInput.value;
    // Define a regular expression that requires at least 8 characters, one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    // If the input doesn't match the regex, set a custom error message
    if (!passwordRegex.test(passwordValue)) {
      passwordInput.setCustomValidity(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
    } else {
      // Otherwise, clear any existing error message
      passwordInput.setCustomValidity("");
    }
  }

  // Add event listeners to perform validation as the user types or blurs from the fields
  usernameInput.addEventListener("input", validateUsername);
  passwordInput.addEventListener("input", validatePassword);
  usernameInput.addEventListener("blur", validateUsername);
  passwordInput.addEventListener("blur", validatePassword);

  // Add event listener to handle form submission
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Perform final validation on submit
    validateUsername();
    validatePassword();
  });
});
