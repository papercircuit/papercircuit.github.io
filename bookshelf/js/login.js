let user = {
    email: email,
    username: username,
    password: password,
};

localStorage.setItem(userName, JSON.stringify(user));

let username = document.querySelector(".email").value; // username of user you want to log in as

let userFromLocalStorage = JSON.parse(localStorage.getItem(username));

if (!userFromLocalStorage) {
    console.log('user doesnt exist');
}

let password = document.querySelector(".pwd").value;

if (userFromLocalStorage.password !== password) {
    console.log('wrong password');
}

console.log('logged in successfully');