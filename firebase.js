
var firebaseConfig = {
    apiKey: "AIzaSyBWfRZi-3aiMEiHfkDatzNMpndn7ZOmeFE",
    authDomain: "todo-shivam.firebaseapp.com",
    databaseURL: "https://todo-shivam-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todo-shivam",
    storageBucket: "todo-shivam.appspot.com",
    messagingSenderId: "762831452544",
    appId: "1:762831452544:web:4fada42e2b6a00d12fe965",
    measurementId: "G-F644LEWQ22"
};

const app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();