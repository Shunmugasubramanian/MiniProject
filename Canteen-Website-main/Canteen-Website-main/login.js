const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const forgotForm = document.querySelector(".forgot-form");
const wrapper = document.querySelector(".wrapper");
const loginTitle = document.querySelector(".title-login");
const registerTitle = document.querySelector(".title-register");

function switchToRegister() {
  loginForm.style.left = "-150%";
  registerForm.style.left = "50%";
  forgotForm.style.left = "150%";
  wrapper.style.height = "580px";
  loginTitle.style.top = "-60px";
  registerTitle.style.top = "50%";
}

function switchToLogin() {
  registerForm.style.left = "150%";
  loginForm.style.left = "50%";
  forgotForm.style.left = "-150%";
  wrapper.style.height = "500px";
  registerTitle.style.top = "-60px";
  loginTitle.style.top = "50%";
}

function forgotPasswordFunction() {
  loginForm.style.left = "150%";
  registerForm.style.left = "-150%";
  forgotForm.style.left = "50%";
  wrapper.style.height = "560px";
  loginTitle.style.top = "-60px";
  registerTitle.style.top = "-60px";
}

function loginFunction() {
  switchToLogin();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("SignUpBtn").addEventListener("click", function (event) {
    event.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-pass").value;
    const agree = document.getElementById("agree").checked;

    if (!agree) {
      alert("You must agree to the terms & conditions.");
      return;
    }

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (data.success) switchToLogin();
      });
  });

  // 🔄 Modified SignIn Button logic
  document.getElementById("SignInBtn").addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById("log-email").value;
    const password = document.getElementById("log-pass").value;

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", email);

          alert("Login successful!");

          // 🔑 Redirect based on admin email
          if (email === "admin@example.com") {
            window.location.href = "menu-items.html"; // Admin page
          } else {
            window.location.href = "index.html"; // Regular user home
          }
        } else {
          alert(data.message || "Invalid email or password!");
        }
      });
  });
});

//localStorage.setItem("username", user.username); // Make sure `user.username` is returned from backend
// After login is successful
//localStorage.setItem("userEmail", email); // Important for fetching name later



function resetPassword() {
  const email = document.getElementById("forgotEmail").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  fetch("http://localhost:5000/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.success) loginFunction();
    })
    .catch(err => console.error("Error:", err));
}
