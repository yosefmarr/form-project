/**
 * Registration Form Validation and Handling Script
 *
 * References:
 * - Document.getElementById: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
 * - Element.classList: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * - Element.addEventListener: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * - localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * - RegExp: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * - Event.preventDefault: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
 * - HTMLFormElement.checkValidity: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/checkValidity
 * - HTMLInputElement.checkValidity: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
 * - Node.innerHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
 * - Window.location: https://developer.mozilla.org/en-US/docs/Web/API/Window/location
 */

// Function to display registration error message
const showRegisterError = (message) => {
  // Get the element where error messages will be displayed
  const registerError = document.getElementById('registerError');
  // Create a new div element to contain the error message
  const wrapper = document.createElement('div');
  // Set the inner HTML of the wrapper with the error message
  wrapper.innerHTML = `
    <div class="alert alert-danger" role="alert">
      <b>Registration failed.</b> ${message}
    </div>
  `;
  // Append the error message wrapper to the registerError element
  registerError.append(wrapper);
};

// Function to clear the registration error message
const clearRegisterError = () => {
  // Get the element where error messages are displayed
  const registerError = document.getElementById('registerError');
  // Clear its content
  registerError.innerHTML = '';
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

// Function to validate password strength
const validatePasswordStrength = (password) => {
  // Regular expression to ensure password has at least one digit, one lowercase letter, one uppercase letter, and is at least 8 characters long
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  // Test the password against the regex
  return regex.test(password);
};

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the form and input field elements
  const form = document.getElementById('registerForm');
  const firstNameField = document.getElementById('firstName');
  const lastNameField = document.getElementById('lastName');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirmPassword');
  const favoriteColorField = document.getElementById('favoriteColor');
  const favoriteSongField = document.getElementById('favoriteSong');

  // Add submit event listener to the form
  form.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Clear any previous error messages
    clearRegisterError();
    // Check if the form is valid
    if (!form.checkValidity()) {
      // If invalid, add 'was-validated' class to show validation feedback
      form.classList.add('was-validated');
    } else {
      // Get the values from the input fields
      const email = emailField.value;
      const password = passwordField.value;
      const confirmPassword = confirmPasswordField.value;
      const firstName = firstNameField.value;
      const lastName = lastNameField.value;
      const favoriteColor = favoriteColorField.value;
      const favoriteSong = favoriteSongField.value;

      // Check if a user with the same email already exists in localStorage
      if (localStorage.getItem(email)) {
        showRegisterError('A user with that email has already registered.');
        emailField.classList.add('is-invalid');
        return;
      }

      // Validate the password strength
      if (!validatePasswordStrength(password)) {
        showRegisterError(
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'
        );
        passwordField.classList.add('is-invalid');
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        showRegisterError('Passwords do not match.');
        confirmPasswordField.classList.add('is-invalid');
        return;
      }

      // Create a user object with the input data
      const user = {
        firstName,
        lastName,
        email,
        password,
        favoriteColor,
        favoriteSong,
      };

      // Store the user data in localStorage
      localStorage.setItem(email, JSON.stringify(user));
      // Redirect to the index.html page
      window.location.href = '../index.html';
    }
  });

  // Function to add validation listeners to input fields
  const addValidationListeners = (field) => {
    // Clear error message on input
    field.addEventListener('input', clearRegisterError);
    // Validate field on blur (when the field loses focus)
    field.addEventListener('blur', () => validateField(field));
  };

  // Function to validate password on blur
  const validatePasswordOnBlur = (field) => {
    field.addEventListener('blur', () => {
      // Check if the password meets strength requirements
      if (!validatePasswordStrength(field.value)) {
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
        clearRegisterError();
      }
    });
  };

  // Function to validate confirm password on blur
  const validateConfirmPasswordOnBlur = (field) => {
    field.addEventListener('blur', () => {
      // Check if the confirm password matches the password field
      if (field.value !== passwordField.value) {
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
        clearRegisterError();
      }
    });
  };

  // Add validation listeners to all input fields
  addValidationListeners(firstNameField);
  addValidationListeners(lastNameField);
  addValidationListeners(emailField);
  addValidationListeners(passwordField);
  addValidationListeners(confirmPasswordField);
  addValidationListeners(favoriteColorField);
  addValidationListeners(favoriteSongField);

  // Validate password and confirm password fields on blur
  validatePasswordOnBlur(passwordField);
  validateConfirmPasswordOnBlur(confirmPasswordField);
});
