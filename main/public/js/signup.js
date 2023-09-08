const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        const responseData = await response.json();
        if (responseData.err) {
          // Handle the specific password length validation error here
          alert(responseData.err);
        } else if (responseData.errors) {
          // Handle other validation errors here
          console.error(responseData.errors);
        } else {
          // Handle other error cases
          alert('An error occurred during registration.');
        }
      }
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);