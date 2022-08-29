let addDescription = document.querySelector(".message");
let addTitle = document.querySelector(".title");
let addDate = document.querySelector(".due_date");
let addButton = document.querySelector(".add");
let todo = document.querySelector(".todo");

let todoList = [];
const tasksEndpoint = 'http://localhost:3000/task'

async function getData() {
  let data = await fetch(tasksEndpoint)
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Something went wrong');
    })
  .catch((error) => {
    console.log(error)
    alert('Something went wrong! Please reload page')
  });

  data.map(item => todoList.push({
    id: item.task_id,
    title: item.title,
    description: item.description,
    done: item.done,
    due_date: item.due_date ? new Date(item.due_date) : item.due_date, 
  }))
  displayMessages()
}

getData()
displayMessages()

async function createTask(newTask) {
  return await fetch(tasksEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
  .then(res => res.json())
}

async function deleteTaskOnServer(id) {
  return await fetch(`http://localhost:3000/task/${id}`, {
    method: 'DELETE'
  }) 
}

async function updateTask(id, done) {
  return await fetch(`http://localhost:3000/task/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(done)
  })
  .then(res => res.json())
}


addButton.addEventListener("click", function () {

  let date = new Date(addDate.value);

  let newTask = {
    list_id: 1,
    title: addTitle.value,
    description: addDescription.value,
    done: false,
    due_date: date,
  };

  if (newTask.title.trim().length === 0) {
    return (addTitle.classList.add("incorrect-title"),
    addTitle.placeholder = 'Incorrect title',
    addTitle.value = '',
    addDescription.value = '',
    addDate.value = '')
  }
  addTitle.placeholder = 'Title';
  addTitle.classList.remove("incorrect-title");
  addTitle.value = '';
  addDescription.value = '';
  addDate.value = '';


  todoList.push(newTask);
  displayMessages();
  createTask(newTask).then((item) => {
    let i = todoList.indexOf(newTask);
    todoList[i] = {
      list_id: 1,
      id: item.task_id,
      title: item.title,
      description: item.description,
      done: item.done,
      due_date: item.due_date ? new Date(item.due_date) : item.due_date,
    };
    displayMessages();
  })

});

function displayMessages() {
  let displayMessage = "";
  todoList.forEach(function (item, i) {
    displayMessage += `
        <li id='${item.id}' class=${item.done ? "done-task" : "undone-task"}>
          ${item.due_date ? `
            <div>
              <img src="./assets/img/Group.svg" alt="calendar">
              <label class=${checkDueDate(item.due_date)} for='item_${i}'>
                ${item.due_date.getDate()}.
                ${item.due_date.getMonth() < 10 ? "0" : ""}${item.due_date.getMonth() + 1}.
                ${item.due_date.getFullYear()}
              </label>
            </div>` : ""}
          <br>
          <input onclick="chengeDone(${item.id})" class='check' type='checkbox' id='item_${i}' ${item.done ? "checked" : ""}>
          <label class='task-title' for='item_${i}'>${item.title}</label><br>
          <label class='task-description' for='item_${i}'>${item.description ? item.description : ''}</label>
          <button class='delete' onclick="deleteTask(${item.id})">&#9768;</button>
        </li>
        `;
    todo.innerHTML = displayMessage;
  });
}

function checkDueDate(due_date) {
  let today = new Date();
  if (due_date.getDate() < today.getDate()) {
    return "task-date-red";
  }
  return "task-date";
}

function chengeDone(id) {
  todoList.map(item => {
    if (id === item.id) {
      item.done = !item.done
      updateTask(id, {done:item.done})
    }
  })
  displayMessages()

}

function deleteTask(id) {
  todoList = todoList.filter(item => item.id !== id)
  displayMessages();
  deleteTaskOnServer(id)
}

function chengeDisplay () {
  var checkBox = document.getElementById("display-toggle");

  var doneTasks = document.querySelectorAll(".done-task");
    

  if (checkBox.checked == true){
    doneTasks.forEach(task => task.style.display = "block")
  } else {
  doneTasks.forEach(task => task.style.display = "none")
  }
}

