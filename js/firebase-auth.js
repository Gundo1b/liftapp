// ✅ Replace this with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyADLB06k2VYNAmtg3Kqp5y-qvSOm2BkDr8",
  authDomain: "liftapp-d8aee.firebaseapp.com",
  projectId: "liftapp-d8aee",
  storageBucket: "liftapp-d8aee.appspot.com",  // ✅ fixed domain
  messagingSenderId: "804473144663",
  appId: "1:804473144663:web:2b2dca35afb6006775aa12"
};

// ✅ Initialize Firebase properly
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// Optional: Only use this if you really need analytics (not needed for auth to work)
// const analytics = firebase.analytics(app);

// ✅ Toggle password visibility
function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("bi-eye-slash", "bi-eye");
  }
}

// ✅ Login User
async function loginUser() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const status = document.getElementById("status");

  if (!email || !password) {
    status.textContent = "Email and password are required.";
    status.style.color = "red";
    return;
  }

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    status.textContent = "✅ Login successful! Redirecting...";
    status.style.color = "green";

    setTimeout(() => {
      window.location.href = "/pages/dashboard.html";
    }, 1000);
  } catch (error) {
    console.error("Login error:", error.message);
    status.textContent = error.message;
    status.style.color = "red";
  }
}

// ✅ Register User
async function registerUser() {
  const fullName = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;
  const status = document.getElementById("status");

  if (!email || !password || !confirm || !fullName || !phone) {
    status.textContent = "All fields are required.";
    status.style.color = "red";
    return;
  }

  if (password !== confirm) {
    status.textContent = "Passwords do not match.";
    status.style.color = "red";
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // ✅ Optional: Save fullName & phone in Firestore if needed
    // ✅ For now just log
    console.log("User registered:", user);

    status.textContent = "✅ Registered successfully!";
    status.style.color = "green";
  } catch (error) {
    console.error("Firebase error:", error.message);
    status.textContent = error.message;
    status.style.color = "red";
  }
}
