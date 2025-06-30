window.togglePassword = function(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  }
}

window.loginUser = async function() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const status = document.getElementById('login-status');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    status.textContent = error.message;
    status.style.color = "red";
  } else {
    status.textContent = "Logged in successfully!";
    status.style.color = "green";
    setTimeout(() => {
      window.location.href = '/pages/dashboard.html';
    }, 2000);
  }
};