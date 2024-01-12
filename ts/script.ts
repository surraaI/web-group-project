function storeToken(token: string) {
  localStorage.setItem('token', token);
}

// Function to retrieve the token from local storage
function getToken(): string | null {
  return localStorage.getItem('token');
}
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
          const token: string = data.token; // Assuming the token is returned as 'token' property in the response

        // Store the token in local storage
        storeToken(token);
          console.log('Signup successful:', data);
          window.location.href = 'index.html';

        } else if (response.status === 409) {
          // Email already exists
          const data = await response.json();
          console.error('Signup failed:', data.error);
          // Create and display an error message element
         
        } else {
          // Handle signup failure
          const errormsg = document.getElementById('error-message') as HTMLElement;
          const errorMessageElement = document.createElement('p');
          errorMessageElement.innerText = 'Email already exists. Please login instead.';
          errorMessageElement.style.color = 'red';
          errormsg.appendChild(errorMessageElement);

          console.error('Signup failed:', response.json());
        }
      } catch (error) {
        // Handle network error
        console.error('Error occurred during signup:', error);
      }
    }
  });
}
// login form
const loginForm = document.getElementById("loginForm");
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
          window.location.href = 'index.html';

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
// health tracking page
const HealthRecordForm = document.getElementById('health-record') as HTMLFormElement;
const tableBody = document.querySelector('table tbody');

if (HealthRecordForm && tableBody) {
  HealthRecordForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    const calories = document.getElementById('calories') as HTMLInputElement | null;
    const FoodType = document.getElementById('foodType') as HTMLInputElement | null;
    const Weight = document.getElementById('weight') as HTMLInputElement | null;
    const Height = document.getElementById('height') as HTMLInputElement | null;
    const exerciseMinutes = document.getElementById('exerciseMinutes') as HTMLInputElement | null;
    const waterIntake = document.getElementById('waterIntake') as HTMLInputElement | null;

    if (calories && Weight && Height && FoodType && exerciseMinutes && waterIntake) {
      const caloriesAmount = calories.value;
      const foodType = FoodType.value;
      const weight = Weight.value;
      const height = Height.value;
      const minutesOfExercise = exerciseMinutes.value;
      const amountOfWaterTaken = waterIntake.value;

      const createHealthRecordDto = {
        caloriesAmount,
        foodType,
        weight,
        height,
        minutesOfExercise,
        amountOfWaterTaken
        
      };

      try {
        const token = getToken(); // Retrieve the token from storagenpx tsc

        if (token) {
          const response = await fetch('http://localhost:3000/health-records/createRecord', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the token in the authorization header
            },
            body: JSON.stringify(createHealthRecordDto),
          });

        if (response.ok) {
          const data = await response.json();
          // Handle successful record creation
          console.log(data)

          // Create a new row in the table
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
            <td>${data.date}</td>
            <td>${data.caloriesAmount}</td>
            <td>${data.weight}</td>
            <td>${data.height}</td>
            <td>${data.foodType}</td>
            <td>${data.minutesOfExercise}</td>
            <td>${data.amountOfWaterTaken}</td>
          `;
          tableBody.appendChild(newRow);

          // Clear the form inputs
          HealthRecordForm.reset();
        } else {
          // Handle record creation failure
          const errorData = await response.json();
          console.error('Record creation failed:', errorData);
        }}
      } catch (error) {
        // Handle network error
        console.error('Error occurred during record creation:', error);
      }
    }
  });
}
//login as admin
const loginAsAdmin = document.getElementById("login-as-admin");

if (loginAsAdmin) {
  loginAsAdmin.addEventListener("click", () => {
    window.location.href = "/admin_dashboard.html";
  });}