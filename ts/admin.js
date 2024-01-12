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
const LoginForm = document.getElementById('loginForm');
if (LoginForm) {
    LoginForm.addEventListener('submit', function (event) {
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
                        StoreToken(token);
                        console.log('Login successful:', data);
                        window.location.href = 'adminPage.html';
                        // Redirect to the appropriate page based on the user's role
                        // redirectBasedOnRole(data.role); // Assuming the role is returned as 'role' property in the response
                    }
                    else {
                        // Handle login failure
                        const data = yield response.json();
                        console.error('Login failed:', data.error);
                        // Create and display an error message element
                        const errormessage = document.getElementById('error-message');
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
// Function to store the token in local storage
function StoreToken(token) {
    localStorage.setItem('token', token);
}
// Function to retrieve the token from local storage
function GetToken() {
    return localStorage.getItem('token');
}
const createAdminForm = document.getElementById('create-admin-form');
if (createAdminForm) {
    createAdminForm.addEventListener('submit', function (event) {
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
                    const token = GetToken(); // Retrieve the token from local storage
                    const response = yield fetch('http://localhost:3000/auth/createAdmin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                        },
                        body: JSON.stringify(createUserDto),
                    });
                    if (response.ok) {
                        const data = yield response.json();
                        const token = data.token; // Assuming the token is returned as 'token' property in the response
                        // Store the token in local storage
                        StoreToken(token);
                        console.log('created successful:', data);
                        // window.location.href = 'adminPage.html';
                    }
                    else if (response.status === 409) {
                        // Email already exists
                        const data = yield response.json();
                        console.error('creating failed:', data.error);
                        // Create and display an error message element
                    }
                    else {
                        // Handle signup failure
                        const errormsg = document.getElementById('error-message');
                        const errorMessageElement = document.createElement('p');
                        errormsg.innerText = '';
                        errorMessageElement.innerText = '';
                        errorMessageElement.innerText = 'Email already exists. Please login instead.';
                        errorMessageElement.style.color = 'red';
                        errormsg.appendChild(errorMessageElement);
                        console.error('creating another admin failed:', response.json());
                    }
                }
                catch (error) {
                    // Handle network error
                    console.error('Error occurred during creating another admin:', error);
                }
            }
        });
    });
}
const allUsersButton = document.getElementById('all-users');
if (allUsersButton) {
    allUsersButton.addEventListener('click', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            try {
                const token = GetToken();
                const response = yield fetch('http://localhost:3000/auth/findAll', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });
                if (response.ok) {
                    const data = yield response.json();
                    console.log('All users:', data);
                    // Update the HTML with the user names and buttons
                    const userListContainer = document.getElementById('user-list');
                    if (userListContainer) {
                        // Clear existing user names and buttons
                        userListContainer.innerHTML = '';
                        // Create a list item for each user name
                        // ...
                        // Create a list item for each user name
                        data.forEach((user) => {
                            const listItem = document.createElement('li');
                            listItem.style.color = 'black';
                            // Create a span element for the user name
                            const nameSpan = document.createElement('span');
                            nameSpan.innerText = 'Full-name: ' + user.name;
                            // Create a span element for the user email
                            const emailSpan = document.createElement('span');
                            emailSpan.innerText = 'Email: ' + user.email;
                            emailSpan.style.marginLeft = '50px'; // 
                            emailSpan.style.display = 'block';
                            const deleteButton = document.createElement('button');
                            deleteButton.innerText = 'Delete';
                            deleteButton.style.marginRight = '10px'; // Add margin to create a gap
                            deleteButton.addEventListener('click', () => {
                                deleteUser(user._id);
                            });
                            const editButton = document.createElement('button');
                            editButton.innerText = 'Edit';
                            editButton.style.marginRight = '10px'; // Add margin to create a gap
                            editButton.addEventListener('click', () => {
                                editUser(user._id);
                            });
                            listItem.appendChild(nameSpan);
                            listItem.appendChild(emailSpan);
                            listItem.appendChild(deleteButton);
                            listItem.appendChild(editButton);
                            userListContainer.appendChild(listItem);
                        });
                    }
                }
                else {
                    console.error('Failed to fetch all users:', response.status);
                }
            }
            catch (error) {
                console.error('Error occurred during fetch:', error);
            }
        });
    });
}
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = GetToken();
            const response = yield fetch(`http://localhost:3000/auth/deleteUser/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
            if (response.ok) {
                console.log('User deleted successfully!');
                // Refresh the user list
                if (allUsersButton) {
                    allUsersButton.dispatchEvent(new Event('click'));
                }
            }
            else {
                console.error('Failed to delete user:', response.status);
            }
        }
        catch (error) {
            console.error('Error occurred during delete:', error);
        }
    });
}
function editUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the updated name and email from the user
            const newName = prompt('Enter the new name:');
            const newEmail = prompt('Enter the new email:');
            if (newName && newEmail) {
                const token = GetToken();
                const response = yield fetch(`http://localhost:3000/auth/updateUser/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    body: JSON.stringify({ name: newName, email: newEmail }),
                });
                if (response.ok) {
                    console.log('User edited successfully!');
                    // Refresh the user list
                    if (allUsersButton) {
                        allUsersButton.dispatchEvent(new Event('click'));
                    }
                }
                else {
                    console.error('Failed to edit user:', response.status);
                }
            }
        }
        catch (error) {
            console.error('Error occurred during edit:', error);
        }
    });
}
