/**
 * User Profile Page Script
 *
 * References:
 * - Document.getElementById: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
 * - Element.textContent: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 * - Element.addEventListener: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * - localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * - JSON.parse: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 * - Window.location: https://developer.mozilla.org/en-US/docs/Web/API/Window/location
 */

// Add event listener to execute code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the current user from localStorage
  const currentUser = localStorage.getItem('currentUser');

  // Redirect to the login page if there is no current user
  if (!currentUser) {
    window.location.href = '../index.html';
  }

  // Parse the user data from localStorage
  const user = JSON.parse(localStorage.getItem(currentUser));

  // Display the user's email on the profile page
  document.getElementById('userEmail').textContent = user.email;
  // Display the user's full name on the profile page
  document.getElementById(
    'userName'
  ).textContent = `${user.firstName} ${user.lastName}`;
  // Display the user's favorite color and song on the profile page
  document.getElementById(
    'userDetails'
  ).textContent = `My favorite color is ${user.favoriteColor} and my favorite song is ${user.favoriteSong}`;

  // Add click event listener to the logout button
  document.getElementById('logoutBtn').addEventListener('click', function () {
    // Remove the current user from localStorage
    localStorage.removeItem('currentUser');
    // Redirect to the login page
    window.location.href = '../index.html';
  });
});
