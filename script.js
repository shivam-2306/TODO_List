
function getItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
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

function generateItems(items){
    let todoItems = [];
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");

        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = '<img src="./assets/icon-check.svg">';
        checkMark.addEventListener("click", function(){
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
        timestampText.innerText = new Date(item.timestamp).toLocaleString();

        todoTextContainer.appendChild(todoText);
        timestampContainer.appendChild(timestampText);

        let editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.innerHTML = '<img src="./assets/icon-edit.svg">';
        editButton.addEventListener("click", function(){
            editItem(item.id);
        });

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = '<img src="./assets/icon-delete.svg">';
        deleteButton.addEventListener("click", function(){
            deleteItem(item.id);
        });

        todoItem.appendChild(checkContainer);
        todoTextContainer.appendChild(timestampContainer);
        todoTextContainer.appendChild(editButton);
        todoTextContainer.appendChild(deleteButton);
        todoItem.appendChild(todoTextContainer);

        if(item.status == "completed"){
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
        }

        todoItems.push(todoItem);
    });

    document.querySelector(".todo-items").replaceChildren(...todoItems);
}


function addItem(event) {// console.log("TASKSTATUS");
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let dueDate = document.getElementById("due-date");
    let important = document.querySelector('.check-important').checked; // get the value of the checkbox
    db.collection("todo-items").add({
      text: text.value,
      status: "active",
      timestamp: dueDate.value,
      important: important // add important field to new item
    }).then((docRef) => {
      text.value = "";
      dueDate.value = "";
      document.querySelector('.check-important').checked = false; // uncheck the checkbox
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

function markCompleted(id){// console.log("TASKSTATUS");
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
    getItems();
}


function clearCompleted() {// console.log("TASKSTATUS");
    db.collection("todo-items").where("status", "==", "completed")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        })
        .catch(function(error) {
            console.error("Error removing completed tasks: ", error);
        });
}



  
function displayTasksByStatus(status) {// console.log("TASKSTATUS");
    db.collection("todo-items")
      .where("status", "==", status)
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
  

  function editItem(id) {// console.log("TASKSTATUS");
    let item = db.collection("todo-items").doc(id);
    let newText = prompt("Enter the new text for this todo item:");
    item.update({
        text: newText
    })
    .then(function() {
        console.log("Todo item updated successfully!");
    })
    .catch(function(error) {
        console.error("Error updating todo item: ", error);
    });
}


function deleteItem(itemId) {// console.log("TASKSTATUS");
    const itemRef = db.collection('todo-items').doc(itemId);
  
    const confirmDelete = confirm("Are you sure you want to delete this item?");
  
    if (confirmDelete) {
      itemRef.delete()
        .then(() => {
        
          console.log("Item successfully deleted from database");
          generateItems();
        })
        .catch((error) => {
          console.error("Error deleting item from database: ", error);
        });
    }
  }
  function toggleDropdown() {// console.log("TASKSTATUS");
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
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
      .orderBy("timestamp", "desc")
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
getItems();