// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
// const firebaseConfig = {
//     apiKey: "AIzaSyBWfRZi-3aiMEiHfkDatzNMpndn7ZOmeFE",
//     authDomain: "todo-shivam.firebaseapp.com",
//     databaseURL: "https://todo-shivam-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "todo-shivam",
//     storageBucket: "todo-shivam.appspot.com",
//     messagingSenderId: "762831452544",
//     appId: "1:762831452544:web:4fada42e2b6a00d12fe965",
//     measurementId: "G-F644LEWQ22"
// };

// const app = initializeApp(firebaseConfig);
// var auth = getAuth(app);
// var db = getFirestore(app);

// const submitButton = document.getElementById("submit");
// const signupButton = document.getElementById("sign-up");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const main = document.getElementById("main");
// const createacct = document.getElementById("create-acct")

// const signupEmailIn = document.getElementById("email-signup");
// const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
// const signupPasswordIn = document.getElementById("password-signup");
// const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
// const createacctbtn = document.getElementById("create-acct-btn");

// const returnBtn = document.getElementById("return-btn");
// var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

// createacctbtn.addEventListener("click", function () {
//     var isVerified = true;
//     let signupEmail = signupEmailIn.value;
//     let confirmSignupEmail = confirmSignupEmailIn.value;
// if (signupEmail != confirmSignupEmail) {
//     window.alert("Email fields do not match. Try again.")
//     isVerified = false;
// }

// let signupPassword = signupPasswordIn.value;
// let confirmSignUpPassword = confirmSignUpPasswordIn.value;
// if (signupPassword != confirmSignUpPassword) {
//     window.alert("Password fields do not match. Try again.")
//     isVerified = false;
// }

// if (signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
//     window.alert("Please fill out all required fields.");
//     isVerified = false;
// }

// if (isVerified) {
//     createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
//         .then((userCredential) => {
//             const user = userCredential.user;
//             db.collection("users").doc(user.uid).set({
//                 email: user.email,
//             }).then(() => {

//                 db.collection("users").doc(user.uid).collection("userdata").doc("default").set({
//                     data: "initial data"
//                 }).then(() => {
//                     console.log("User database created");
//                 }).catch((error) => {
//                     console.error("Error occurred while creating user database:", error);
//                 });

//                 window.alert("Success! Account created.");
//             }).catch((error) => {
//                 window.alert("Error occurred. Try again.");
//             });
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             window.alert("Error occurred. Try again.");
//         });
// }
// });

// submitButton.addEventListener("click", function () {
//     email = emailInput.value;
//     console.log(email);
//     password = passwordInput.value;
//     console.log(password);

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             console.log("Success! Welcome back!");
//             window.alert("Success! Welcome back!");
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log("Error occurred. Try again.");
//             window.alert("Error occurred. Try again.");
//         });
// });

// signupButton.addEventListener("click", function () {
//     main.style.display = "none";
//     createacct.style.display = "block";
// });

// returnBtn.addEventListener("click", function () {
//     main.style.display = "block";
//     createacct.style.display = "none";
// });
