// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAElW2rlXzUvD_KyrlnGQkToj8O9nGnV8g",
  authDomain: "m9wdeen.firebaseapp.com",
  projectId: "m9wdeen",
  storageBucket: "m9wdeen.firebasestorage.app",
  messagingSenderId: "430066371498",
  appId: "1:430066371498:web:118ef0e366b1a2ad9479d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Function for login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showDashboard(user);
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

// Function for signup
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showDashboard(user);
    })
    .catch((error) => {
      alert("Signup failed: " + error.message);
    });
}

// Function to show dashboard after login/signup
function showDashboard(user) {
  document.getElementById("username").textContent = user.email.split("@")[0];
  document.getElementById("login-screen").style.display = "none"; // Hide the login screen
  document.getElementById("dashboard").style.display = "block"; // Show the dashboard
  loadUserData(user.uid); // Load the user's tasks, etc.
}

// Function to load user data from Firebase
function loadUserData(uid) {
  const tasksRef = ref(db, 'users/' + uid + '/tasks');
  tasksRef.get()
    .then((snapshot) => {
      const list = document.getElementById("todo-list");
      list.innerHTML = "";
      snapshot.forEach((child) => {
        const li = document.createElement("li");
        li.textContent = child.val();
        list.appendChild(li);
      });
    })
    .catch((error) => {
      console.log("Error loading user data:", error);
    });
}

// Function to logout
function logout() {
  auth.signOut()
    .then(() => {
      document.getElementById("login-screen").style.display = "block"; // Show login screen
      document.getElementById("dashboard").style.display = "none"; // Hide dashboard
    })
    .catch((error) => {
      console.log("Error logging out:", error);
    });
}
