"use strict";
// script.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
                        // Handle successful signup
                        console.log('Signup successful:', data);
                    }
                    else {
                        // Handle signup failure
                        console.error('Signup failed:', response.status);
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
