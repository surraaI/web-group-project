
//index- page
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    let caloriesAmount = (<HTMLInputElement>document.getElementById('calories')).value;
    let foodType = (<HTMLInputElement>document.getElementById('foodType')).value;
    let weight = (<HTMLInputElement>document.getElementById('weight')).value;
    let height = (<HTMLInputElement>document.getElementById('height')).value;
    let exerciseMinutes = (<HTMLInputElement>document.getElementById('exerciseMinutes')).value;
    let waterIntake = (<HTMLInputElement>document.getElementById('waterIntake')).value;

  
    let data = {
      caloriesAmount: caloriesAmount,
      foodType: foodType,
      weight: weight,
      height: height,
      exerciseMinutes: exerciseMinutes,
      waterIntake: waterIntake,
    };

    fetch('https://api.example.com/healthData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          
          console.log('Data sent successfully!');
        } else {
          
          console.log('Error:', response.status);
        }
      })
      .catch((error) => {
        
        console.log('Error:', error);
      });

  
    form.reset();
  });
});
// Login page

type User = {
  username: string;
  password: string;
};

const usernameInput = document.getElementById('username') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const loginButton = document.getElementById('login') as HTMLButtonElement;

loginButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const user: User = {
    username,
    password,
  };

  login(user);
});

function login(user: User) {
  fetch('https://api.example.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      console.log('Login successful:', data);
      resetLoginFields();
    })
    .catch((error) => {
      console.error('An error occurred during login:', error);
    });
}

function resetLoginFields() {
  usernameInput.value = '';
  passwordInput.value = '';
}
// signup page
type User2 = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordSignInput = document.getElementById('password') as HTMLInputElement;
const signupButton = document.getElementById('signup') as HTMLButtonElement;

signupButton.addEventListener('click', (event) => {
  event.preventDefault();
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if ( firstName && lastName && email && password) {
    const user: User2 = {
      firstName,
      lastName,
      email,
      password,
    };

    fetch('https://api.example.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Sign up successful:', user);
          resetSignUpFields();
        } else {
          console.error('Sign up failed:', response.status, response.statusText);
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  } else {
    console.error('Invalid input. Please fill in all required fields and provide a valid email address.');
  }
});

function resetSignUpFields() {
  firstNameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
}