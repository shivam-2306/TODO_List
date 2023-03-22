
var firebaseConfig = {
    apiKey: "AIzaSyAn_UXnLt02Ffh1kOXE0C2y86X-7weBQX0",
    authDomain: "test-cfd99.firebaseapp.com",
    databaseURL: "https://test-cfd99-default-rtdb.firebaseio.com",
    projectId: "test-cfd99",
    storageBucket: "test-cfd99.appspot.com",
    messagingSenderId: "442320950003",
    appId: "1:442320950003:web:7f34666286b16bfaabdd86",
    measurementId: "G-WYX553T386"
};

export const app = firebase.initializeApp(firebaseConfig);
export var db = firebase.firestore();
export const auth = firebase.auth();
db.settings({ timestampsInSnapshots: true, merge: true });