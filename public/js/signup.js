const signupClickHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const business_name = document.querySelector('#businessName-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document.querySelector('#confirmPassword-signup').value.trim();
  
  if (password !== confirmPassword) {
      window.alert("Passwords do not match");
  }
  else if (userName && email && password && business_name) {
    const response = await fetch('/api/users/new', {
      method: 'POST',
      body: JSON.stringify({ userName, email, business_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/reviews-all');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.login100-form').addEventListener('submit', signupClickHandler);