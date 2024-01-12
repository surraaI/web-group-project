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
const loginform = document.getElementById("loginForm");
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
                        window.location.href = 'adminPage.html';
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
