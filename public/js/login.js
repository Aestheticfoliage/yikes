const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
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
  
  // const signupFormHandler = async (event) => {
  //   event.preventDefault();
  
  //   const name = document.querySelector('#name-signup').value.trim();
  //   const email = document.querySelector('#email-signup').value.trim();
  //   const business = document.querySelector('#businessName-signup').value.trim();
  //   const password = document.querySelector('#password-Signup').value.trim();
  //   const confirmPassword = document.querySelector('#confirmEmail-signup').value.trim();
    
  //   if (password !== confirmPassword) {
  //       window.prompt("Passwords do not match");
  //   }
  //   else if (name && email && password && business) {
  //     const response = await fetch('/api/users', {
  //       method: 'POST',
  //       body: JSON.stringify({ name, email, business, password }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  
  //     if (response.ok) {
  //       document.location.replace('/reviews-all');
  //     } else {
  //       alert(response.statusText);
  //     }
  //   }
  // };
  
  document
    .querySelector('.login100-form-btn')
    .addEventListener('submit', loginFormHandler);
  
  // document
  //   .querySelector('.login100-form-btn')
  //   .addEventListener('submit', signupFormHandler);