// script.js

var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addNewToDoItem);

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

// Fungsi untuk menambahkan item baru ke dalam todo-list
function addNewToDoItem() {
    var itemText = toDoEntryBox.value;
    if (itemText.trim() !== "") {  // Pastikan input tidak kosong
        newToDoItem(itemText, false);
        toDoEntryBox.value = "";  // Bersihkan input setelah ditambahkan
        saveList();  // Simpan ke local storage
    }
}

// Fungsi untuk membuat elemen li baru dan menambahkannya ke dalam todo-list
function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

// Fungsi untuk mengganti status item ketika di-double click
function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
    saveList();
}

function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

var myArray = [];
myArray.push("something to store");
myArray.push("something else to store");
alert(myArray[0]);

var toDoInfo = {
    "task": "Thing I need to do",
    "completed" : false
};

function saveList() {
    var toDos = [];

    for (var i = 0 ; i < toDoList.children.length;  i++)  {       
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task" : toDo.innerText,
            "completed" : toDo.classList.contains("completed")
        };
    
        toDos.push(toDoInfo);
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
    console.log("masuk");
}

function loadList() {
    if (localStorage.getItem("toDos" != null)) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();
