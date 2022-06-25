const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const userName = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (userName && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/signIn', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/reviews-all');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('.login100-form').addEventListener('submit', loginFormHandler);
  