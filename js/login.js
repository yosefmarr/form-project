/**
 * Login Form Validation and Handling Script
 *
 * References:
 * - Document.getElementById: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
 * - Element.classList: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * - Element.addEventListener: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * - localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * - Event.preventDefault: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
 * - HTMLFormElement.checkValidity: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/checkValidity
 * - HTMLInputElement.checkValidity: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
 * - Node.innerHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
 * - Window.location: https://developer.mozilla.org/en-US/docs/Web/API/Window/location
 */

// Redirect if the user is already logged in
if (localStorage.getItem('currentUser')) {
  window.location.href = 'html/user.html';
}

// Function to display login error message
const showLoginError = () => {
  // Get the element where error messages will be displayed
  const loginError = document.getElementById('loginError');
  // Create a new div element to contain the error message
  const wrapper = document.createElement('div');
  // Set the inner HTML of the wrapper with the error message
  wrapper.innerHTML = `
    <div class="alert alert-danger" role="alert">
      <b>Login failed.</b> Please check your username and password and try again.
    </div>
  `;
  // Append the error message wrapper to the loginError element
  loginError.append(wrapper);
};

// Function to clear the login error message
const clearLoginError = () => {
  // Get the element where error messages are displayed
  const loginError = document.getElementById('loginError');
  // Clear its content
  loginError.innerHTML = '';
};

// Function to validate input fields
const validateField = (field) => {
  // Check if the field meets the validity requirements
  if (field.checkValidity()) {
    // If valid, add 'is-valid' class and remove 'is-invalid' class
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
  } else {
    // If invalid, add 'is-invalid' class and remove 'is-valid' class
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
  }
};

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the form and input field elements
  const form = document.getElementById('loginForm');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');

  // Add submit event listener to the form
  form.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Check if the form is valid
    if (!form.checkValidity()) {
      // If invalid, add 'was-validated' class to show validation feedback
      form.classList.add('was-validated');
    } else {
      // Get the values from the input fields
      const email = emailField.value;
      const password = passwordField.value;
      // Retrieve the user data from localStorage
      const user = JSON.parse(localStorage.getItem(email));

      // Check if the user exists and the password matches
      if (user && user.password === password) {
        // Store the current user email in localStorage
        localStorage.setItem('currentUser', email);
        // Redirect to the user page
        window.location.href = 'html/user.html';
      } else {
        // Display login error message
        showLoginError();
      }
    }
  });

  // Function to add validation listeners to input fields
  const addValidationListeners = (field) => {
    // Clear error message on input
    field.addEventListener('input', clearLoginError);
    // Validate field on blur (when the field loses focus)
    field.addEventListener('blur', () => validateField(field));
  };

  // Add validation listeners to email and password fields
  addValidationListeners(emailField);
  addValidationListeners(passwordField);
});
