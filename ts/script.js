"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function storeToken(token) {
    localStorage.setItem('token', token);
}
// Function to retrieve the token from local storage
function getToken() {
    return localStorage.getItem('token');
}
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault(); // Prevent form submission
            const nameElement = document.getElementById('name');
            const emailElement = document.getElementById('email');
            const passwordElement = document.getElementById('password');
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
                    const response = yield fetch('http://localhost:3000/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(createUserDto),
                    });
                    if (response.ok) {
                        const data = yield response.json();
                        const token = data.token; // Assuming the token is returned as 'token' property in the response
                        // Store the token in local storage
                        storeToken(token);
                        console.log('Signup successful:', data);
                        window.location.href = 'index.html';
                    }
                    else if (response.status === 409) {
                        // Email already exists
                        const data = yield response.json();
                        console.error('Signup failed:', data.error);
                        // Create and display an error message element
                    }
                    else {
                        // Handle signup failure
                        const errormsg = document.getElementById('error-message');
                        const errorMessageElement = document.createElement('p');
                        errorMessageElement.innerText = 'Email already exists. Please login instead.';
                        errorMessageElement.style.color = 'red';
                        errormsg.appendChild(errorMessageElement);
                        console.error('Signup failed:', response.json());
                    }
                }
                catch (error) {
                    // Handle network error
                    console.error('Error occurred during signup:', error);
                }
            }
        });
    });
}
// login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault(); // Prevent form submission
            const emailElement = document.getElementById('email');
            const passwordElement = document.getElementById('pwd');
            if (emailElement && passwordElement) {
                const email = emailElement.value;
                const password = passwordElement.value;
                const signInDto = {
                    email,
                    password
                };
                try {
                    const response = yield fetch('http://localhost:3000/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(signInDto),
                    });
                    if (response.ok) {
                        const data = yield response.json();
                        const token = data.token; // Assuming the token is returned as 'token' property in the response
                        // Store the token in local storage
                        storeToken(token);
                        console.log('login successful:', data);
                        window.location.href = 'index.html';
                    }
                    else {
                        // Handle login failure
                        const data = yield response.json();
                        console.error('Login failed:', data.error);
                        // Create and display an error message element
                        const errormessage = document.getElementById("error-message");
                        errormessage.innerText = '';
                        const errorMessageElement = document.createElement('p');
                        errorMessageElement.innerText = 'Invalid username or password.';
                        errorMessageElement.style.color = 'red';
                        errormessage.appendChild(errorMessageElement);
                    }
                }
                catch (error) {
                    // Handle network error
                    console.error('Error occurred during login:', error);
                }
            }
        });
    });
}
// health tracking page
const HealthRecordForm = document.getElementById('health-record');
const tableBody = document.querySelector('table tbody');
if (HealthRecordForm && tableBody) {
    HealthRecordForm.addEventListener('submit', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault(); // Prevent form submission
            const calories = document.getElementById('calories');
            const FoodType = document.getElementById('foodType');
            const Weight = document.getElementById('weight');
            const Height = document.getElementById('height');
            const exerciseMinutes = document.getElementById('exerciseMinutes');
            const waterIntake = document.getElementById('waterIntake');
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
                        const response = yield fetch('http://localhost:3000/health-records/createRecord', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}` // Include the token in the authorization header
                            },
                            body: JSON.stringify(createHealthRecordDto),
                        });
                        if (response.ok) {
                            const data = yield response.json();
                            // Handle successful record creation
                            console.log(data);
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
                        }
                        else {
                            // Handle record creation failure
                            const errorData = yield response.json();
                            console.error('Record creation failed:', errorData);
                        }
                    }
                }
                catch (error) {
                    // Handle network error
                    console.error('Error occurred during record creation:', error);
                }
            }
        });
    });
}
//login as admin
const loginAsAdmin = document.getElementById("login-as-admin");
if (loginAsAdmin) {
    loginAsAdmin.addEventListener("click", () => {
        window.location.href = "/admin_dashboard.html";
    });
}
