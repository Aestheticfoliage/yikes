const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(username);
    console.log(password);
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username, password
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/reviewPage.html');
    } else {
      alert('Failed to sign up');
    }
  };
  
  document
    .querySelector('.validate-form')
    .addEventListener('submit', signupFormHandler);