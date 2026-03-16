function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function signup(email, password) {
    let users = getUsers();
    if (users.find(u => u.email === email)) {
        alert("Account already exists");
        return;
    }
    users.push({ email: email, password: password });
    saveUsers(users);
    alert("Account created");
    window.location.href = "loginPage.html";
}

function login(email, password) {
    let users = getUsers();
    let user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert("Invalid login");
        return;
    }
    localStorage.setItem("loggedInUser", email);
    window.location.href = "../Home/Home.html";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../LoginPage/loginPage.html";
}

function requireLogin() {
    let user = localStorage.getItem("loggedInUser");
    if (!user) window.location.href = "loginPage.html";
}

function redirectIfLoggedIn() {
    let user = localStorage.getItem("loggedInUser");
    if (user) window.location.href = "../Home/Home.html";
}