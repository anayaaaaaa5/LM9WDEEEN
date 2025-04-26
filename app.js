// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAElW2rlXzUvD_KyrlnGQkToj8O9nGnV8g",
  authDomain: "m9wdeen.firebaseapp.com",
  projectId: "m9wdeen",
  storageBucket: "m9wdeen.firebasestorage.app",
  messagingSenderId: "430066371498",
  appId: "1:430066371498:web:118ef0e366b1a2ad9479d3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Login function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showDashboard(user);
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

// Signup function
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Signup successful!");
      showDashboard(user);
    })
    .catch((error) => {
      alert("Signup failed: " + error.message);
    });
}

// Show dashboard on successful login/signup
function showDashboard(user) {
  document.getElementById("username").textContent = user.email.split("@")[0];
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  loadUserData(user.uid);
}

// Logout function
function logout() {
  auth.signOut().then(() => {
    location.reload();
  }).catch((error) => {
    alert("Logout failed: " + error.message);
  });
}

// Add task to To-Do List
function addTask() {
  const task = document.getElementById("new-task").value;
  const userId = auth.currentUser.uid;
  if (task) {
    db.ref("users/" + userId + "/tasks").push(task);
    document.getElementById("new-task").value = "";
    loadUserData(userId);
  }
}

// Load user data from Firebase
function loadUserData(uid) {
  db.ref("users/" + uid + "/tasks").once("value").then((snapshot) => {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    snapshot.forEach((child) => {
      const li = document.createElement("li");
      li.textContent = child.val();
      list.appendChild(li);
    });
  });
}

// Save objectives to Firebase
function saveObjectives() {
  const objectives = document.getElementById("objectives").value;
  const userId = auth.currentUser.uid;
  if (objectives) {
    db.ref("users/" + userId + "/objectives").set(objectives);
    alert("Objectives saved!");
  }
}

// Save shared challenges to Firebase
function saveChallenges() {
  const challenges = document.getElementById("shared-challenges").value;
  const userId = auth.currentUser.uid;
  if (challenges) {
    db.ref("users/" + userId + "/challenges").set(challenges);
    alert("Challenges saved!");
  }
}
