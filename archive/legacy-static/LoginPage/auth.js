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

function sendResetLink(email) {
    let users = getUsers();
    let user = users.find(u => u.email === email);
    if (!user) {
        alert("Email not found");
        return;
    }

    localStorage.setItem("resetEmail", email);
    alert("Reset link sent! Click OK to set a new password.");
    window.location.href = "ResetPassword.html";
}

function resetPassword(newPassword) {
    let email = localStorage.getItem("resetEmail");
    if (!email) {
        alert("No password reset requested");
        window.location.href = "loginPage.html";
        return;
    }
    let users = getUsers();
    let user = users.find(u => u.email === email);
    if (!user) {
        alert("User not found");
        return;
    }
    user.password = newPassword;
    saveUsers(users);
    localStorage.removeItem("resetEmail");
    alert("Password successfully reset!");
    window.location.href = "loginPage.html";
}