//index- page
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var caloriesAmount = document.getElementById('calories').value;
        var foodType = document.getElementById('foodType').value;
        var weight = document.getElementById('weight').value;
        var height = document.getElementById('height').value;
        var exerciseMinutes = document.getElementById('exerciseMinutes').value;
        var waterIntake = document.getElementById('waterIntake').value;
        var data = {
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
            .then(function (response) {
            if (response.ok) {
                console.log('Data sent successfully!');
            }
            else {
                console.log('Error:', response.status);
            }
        })
            .catch(function (error) {
            console.log('Error:', error);
        });
        form.reset();
    });
});
var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');
var loginButton = document.getElementById('login');
loginButton.addEventListener('click', function () {
    var username = usernameInput.value;
    var password = passwordInput.value;
    var user = {
        username: username,
        password: password,
    };
    login(user);
});
function login(user) {
    fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error(response.statusText);
        }
    })
        .then(function (data) {
        console.log('Login successful:', data);
        resetLoginFields();
    })
        .catch(function (error) {
        console.error('An error occurred during login:', error);
    });
}
function resetLoginFields() {
    usernameInput.value = '';
    passwordInput.value = '';
}
var firstNameInput = document.getElementById('firstName');
var lastNameInput = document.getElementById('lastName');
var emailInput = document.getElementById('email');
var passwordSignInput = document.getElementById('password');
var signupButton = document.getElementById('signup');
signupButton.addEventListener('click', function (event) {
    event.preventDefault();
    var firstName = firstNameInput.value.trim();
    var lastName = lastNameInput.value.trim();
    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();
    if (firstName && lastName && email && password) {
        var user_1 = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };
        fetch('https://api.example.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_1),
        })
            .then(function (response) {
            if (response.ok) {
                console.log('Sign up successful:', user_1);
                resetSignUpFields();
            }
            else {
                console.error('Sign up failed:', response.status, response.statusText);
            }
        })
            .catch(function (error) {
            console.error('An error occurred:', error);
        });
    }
    else {
        console.error('Invalid input. Please fill in all required fields and provide a valid email address.');
    }
});
function resetSignUpFields() {
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
}
