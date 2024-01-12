const loginform = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    const passwordElement = document.getElementById('pwd') as HTMLInputElement | null;

    if (emailElement && passwordElement) {
      const email = emailElement.value;
      const password = passwordElement.value;

      const signInDto = {
        email,
        password
      };

      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signInDto),
        });

        if (response.ok) {
          const data = await response.json();
          const token: string = data.token; // Assuming the token is returned as 'token' property in the response

        // Store the token in local storage
        storeToken(token);
          console.log('login successful:', data);
          window.location.href = 'adminPage.html';

        } else {
          // Handle login failure
          const data = await response.json();
          console.error('Login failed:', data.error);
          // Create and display an error message element
          const errormessage = document.getElementById("error-message") as HTMLElement;
          errormessage.innerText = '';
          const errorMessageElement = document.createElement('p');
          errorMessageElement.innerText = 'Invalid username or password.';
          errorMessageElement.style.color = 'red';
          errormessage.appendChild(errorMessageElement);
        }
      } catch (error) {
        // Handle network error
        console.error('Error occurred during login:', error);
      }
    }
  });
}