let addDescription = document.querySelector(".message");
let addTitle = document.querySelector(".title");
let addDate = document.querySelector(".due_date");
let addButton = document.querySelector(".add");
let todo = document.querySelector(".todo");

let todoList = [
  {
    id: 1,
    title: "task",
    todo: "todo",
    done: true,
    due_date: "22.08.2022",
  },
  {
    id: 2,
    title: "task",
    todo: "todo",
    done: false,
    due_date: "25.08.2022",
  },
  {
    id: 3,
    todo: "todo",
    done: false
  }
];
localStorage.setItem("todo", JSON.stringify(todoList));
console.log(todoList);
if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

addButton.addEventListener("click", function () {
  let date = new Date(addDate.value);
  const inc =
    (init = 0) =>
    () =>
      ++init;
  const genId = inc();

  let newTodo = {
    id: genId(),
    title: addTitle.value,
    todo: addDescription.value,
    done: false,
    due_date: `${date.getDate()}.${date.getMonth() < 10 ? "0" : ""}${
      date.getMonth() + 1
    }.${date.getFullYear()}`,
  };

  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem("todo", JSON.stringify(todoList));
});


function displayMessages() {
  let displayMessage = "";
  todoList.forEach(function (item, i) {
    displayMessage += `
        <li id='${item.id}' class=${item.done ? "done-task" : "undone-task"}>
          ${item.due_date ? `
            <div>
              <img src="./assets/img/Group.svg" alt="calendar">
              <label class=${checkDueDate(item.due_date)} for='item_${i}'>${item.due_date}</label>
            </div>` : ""}
          <br>
          <input onclick="chengeDone(${item.id})" class='check' type='checkbox' id='item_${i}' ${item.done ? "checked" : ""}>
          ${item.title ? `<label class='task-title' for='item_${i}'>${item.title}</label><br>` : ""}
          <label class='task-description' for='item_${i}'>${item.todo}</label>
          <button class='delete' onclick="deleteTask(${item.id})">&#9768;</button>
        </li>
        `;
    todo.innerHTML = displayMessage;
  });
}

function checkDueDate(due_date) {
  let today = new Date();
  if (due_date.slice(0, 2) < today.getDate()) {
    return "task-date-red";
  }
  return "task-date";
}

function chengeDone(id) {
  todoList.map(item => {
    if (id === item.id) {
      item.done = !item.done
    }
  })
  localStorage.setItem("todo", JSON.stringify(todoList));
  displayMessages();
}

function deleteTask(id) {
  todoList.splice(id - 1 , 1)
  localStorage.setItem("todo", JSON.stringify(todoList));
  displayMessages();

  console.log(todoList);
}

function chengeDisplay () {
  var checkBox = document.getElementById("display-toggle");

  var doneTasks = document.querySelectorAll(".done-task");
  
  console.log(doneTasks);
  

  if (checkBox.checked == true){
    doneTasks.forEach(task => task.style.display = "block")
  } else {
  doneTasks.forEach(task => task.style.display = "none")
  }
}

