import { auth, db } from './firebase.js'
let curruser;
const login = document.getElementById("login");
const logout = document.getElementById("logout");

auth.onAuthStateChanged(user => {
  console.log(user);
  setupUI(user);
  if (user) {
    curruser = user;
  }
})

const setupUI = (user) => {
  if (user) {
    logout.style.display = "block";
    login.style.display = "none";
  }
  else {
    logout.style.display = "none";
    login.style.display = "block";
  }
}


const additem = document.getElementById("add-item");
const allitems = document.getElementById("all-items");
const actitems = document.getElementById("active");
const compitems = document.getElementById("complete");
const sort = document.getElementById("drop-down");
const imp = document.getElementById("importance");
const duedate = document.getElementById("duedate");
const clear = document.getElementById("clear");

function getItems() {
  db.collection("todo-items").where("uid", "==", curruser.uid).onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      })
    })
    generateItems(items);
  })
}

function generateItems(items) {
  let todoItems = [];
  items.forEach((item) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");


    let checkContainer = document.createElement("div");
    checkContainer.classList.add("check");

    let checkMark = document.createElement("div");
    checkMark.classList.add("check-mark");
    checkMark.innerHTML = '<img src="./assets/icon-check.svg">';
    checkMark.addEventListener("click", function () {
      markCompleted(item.id);
    })
    checkContainer.appendChild(checkMark);

    let todoTextContainer = document.createElement("div");
    todoTextContainer.classList.add("todo-text-container");

    let todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = item.text;

    let timestampContainer = document.createElement("div");
    timestampContainer.classList.add("timestamp-container");

    let timestampText = document.createElement("div");
    timestampText.classList.add("timestamp-text");
    timestampText.innerText = new Date(item.timestamp).toLocaleString().substring(0, 10);

    todoTextContainer.appendChild(todoText);
    timestampContainer.appendChild(timestampText);

    let editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML = '<img src="./assets/icon-edit.svg">';
    editButton.addEventListener("click", function () {
      if (curruser && item.uid == curruser.uid)
        editItem(item.id);
      else {
        console.log("you cannot edit this item");
      }
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<img src="./assets/icon-delete.svg">';
    deleteButton.addEventListener("click", function () {
      if (curruser && item.uid == curruser.uid)
        deleteItem(item.id);
      else {
        console.log("you cannot delete this item");
      }
    });

    todoItem.appendChild(checkContainer);
    todoTextContainer.appendChild(timestampContainer);
    todoTextContainer.appendChild(editButton);
    todoTextContainer.appendChild(deleteButton);
    todoItem.appendChild(todoTextContainer);

    if (item.status == "completed" && item.uid == curruser.uid) {
      checkMark.classList.add("checked");
      todoText.classList.add("checked");
    }

    if (item.important && item.uid == curruser.uid) todoText.classList.add("imp");

    todoItems.push(todoItem);
  });

  document.querySelector(".todo-items").replaceChildren(...todoItems);
}


additem.addEventListener("submit", function () {// console.log("TASKSTATUS");
  event.preventDefault();
  if (curruser) {
    let text = document.getElementById("todo-input");
    let dueDate = document.getElementById("due-date");
    let important = document.querySelector('.check-important').checked; // get the value of the checkbox
    db.collection("todo-items").add({
      text: text.value,
      status: "active",
      timestamp: dueDate.value,
      important: important,
      uid: curruser.uid// add important field to new item
    }).then((docRef) => {
      text.value = "";
      dueDate.value = "";
      document.querySelector('.check-important').checked = false; // uncheck the checkbox
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  else {
    window.alert("you cannot add item. please login");
  }
  return false;
})

function markCompleted(id) {// console.log("TASKSTATUS");
  let item = db.collection("todo-items").doc(id);

  item.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().uid == curruser.uid) {
        if (doc.data().status == "active") {
          item.update({
            status: "completed"
          })
        } else {
          item.update({
            status: "active"
          })
        }
      }
      else {
        console.log("you cannot perform this function");
      }
    }
  })
  getItems();
}


clear.addEventListener("click", function () {// console.log("TASKSTATUS");
  db.collection("todo-items").where("status", "==", "completed").where("uid", "==", curruser.uid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    })
    .catch(function (error) {
      console.error("Error removing completed tasks: ", error);
    });
}
)

function displayTasksByStatus(status) {// console.log("TASKSTATUS");
  if (curruser) {
    db.collection("todo-items")
      .where("status", "==", status)
      .where("uid", "==", curruser.uid)
      .get()
      .then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        generateItems(items);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
}


function editItem(id) {// console.log("TASKSTATUS");
  let item = db.collection("todo-items").doc(id);
  item.get().then(function (doc) {
    if (doc.data().uid == curruser.uid) {
      let newText = prompt("Enter the new text for this todo item:");
      if (newText)
        item.update({
          text: newText
        })
          .then(function () {
            console.log("Todo item updated successfully!");
          })
          .catch(function (error) {
            console.error("Error updating todo item: ", error);
          });
    } else { console.log("you cannot perform this function") }
  })
}


function deleteItem(itemId) {// console.log("TASKSTATUS");
  const itemRef = db.collection('todo-items').doc(itemId);

  const confirmDelete = confirm("Are you sure you want to delete this item?");
  itemRef.get().then(function (doc) {
    if (doc.data().uid == curruser.uid)
      if (confirmDelete) {
        itemRef.delete()
          .then(() => {

            console.log("Item successfully deleted from database");
            getItems();
          })
          .catch((error) => {
            console.error("Error deleting item from database: ", error);
          });
      }
      else { console.log("you cannot perform this function"); }
  })
}
function toggleDropdown() {// console.log("TASKSTATUS");
  document.getElementById("drop-down").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
function sortByDueDate() {// console.log("TASKSTATUS");
  db.collection("todo-items")
    .orderBy("timestamp", "asc")
    .where("uid", "==", curruser.uid)
    .get()
    .then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      generateItems(items);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function sortByImportance() {// console.log("TASKSTATUS");
  db.collection("todo-items")
    .orderBy("important", "desc")
    .where("uid", "==", curruser.uid)
    .get()
    .then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      generateItems(items);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

auth.onAuthStateChanged(user => {
  console.log(user);
})

allitems.addEventListener("click", function () { getItems() });
actitems.addEventListener("click", function () { displayTasksByStatus("active") });
compitems.addEventListener("click", function () { displayTasksByStatus("completed") });
sort.addEventListener("click", function () { toggleDropdown() });
imp.addEventListener("click", function () { sortByImportance() });
duedate.addEventListener("click", function () { sortByDueDate() });



