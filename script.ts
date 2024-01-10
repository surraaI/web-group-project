// script.ts

const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    const nameElement = document.getElementById('name') as HTMLInputElement | null;
    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    const passwordElement = document.getElementById('password') as HTMLInputElement | null;

    if (nameElement && emailElement && passwordElement) {
      const name = nameElement.value;
      const email = emailElement.value;
      const password = passwordElement.value;

      const createUserDto = {
        name,
        email,
        password
      };

      try {
        const response = await fetch('http://localhost:3000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createUserDto),
        });

        if (response.ok) {
          const data = await response.json();
          // Handle successful signup
          console.log('Signup successful:', data);
        } else {
          // Handle signup failure
          console.error('Signup failed:', response.status);
        }
      } catch (error) {
        // Handle network error
        console.error('Error occurred during signup:', error);
      }
    }
  });
}