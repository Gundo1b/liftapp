window.registerUser = async function () {
  const fullName = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;
  const status = document.getElementById('status');

  if (password !== confirm) {
    status.textContent = "Passwords do not match!";
    status.style.color = "red";
    return;
  }

  // 1. Sign up user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password
  });

  if (signUpError) {
    status.textContent = signUpError.message;
    status.style.color = "red";
    return;
  }

  const userId = signUpData.user?.id;

  // 2. Save to users table
  const { error: profileError } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
        fullname: fullName,
        phone: phone,
        email: email
      }
    ]);

  if (profileError) {
    status.textContent = "Sign-up successful, but failed to save profile info: " + profileError.message;
    status.style.color = "orange";
  } else {
    status.textContent = "Registered successfully! Please check your email to confirm.";
    status.style.color = "green";
  }
}