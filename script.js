
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoDateInput = document.getElementById("tododate");
const todoList = document.getElementById("todoList");
const priorityInput = document.getElementById("priority");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
  updateClock();
  setInterval(updateClock, 1000); 
});

function addTask() {
  const newTask = todoInput.value.trim();
  const dueDate = todoDateInput.value; 
  const selectPriority = priorityInput.value; 
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false, date: dueDate, priority: selectPriority }); 
    saveToLocalStorage();
    todoInput.value = "";
    todoDateInput.value = ""; 
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  const priorityColors = {
    "Low": "priority-low",
    "Medium": "priority-medium",
    "High": "priority-high", 
    "Urgent": "priority-urgent" 
  };

  todo.forEach((item, index) => {
    const formattedDate = item.date ?
      new Date(item.date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) :
      'No Date';
    const priorityClass = priorityColors[item.priority] || "priority-default"; 
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="todo-item-content">
        <div class="todo-container">
          <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
            item.disabled ? "checked" : ""
          }>
          <p id="todo-${index}" class="${
            item.disabled ? "disabled" : ""
          }" onclick="editTask(${index})">${item.text}</p>
          <span class="todo-priority ${priorityClass}">${item.priority}</span>
        </div>
        <div class="todo-details">
            <span class="todo-date">${formattedDate}</span>
        </div>
      </div>
    `;
    li.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );

    todoList.appendChild(li);
  });

  todoCount.textContent = todo.length;
}
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");
  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();
  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}
function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  const timeString = `${hours}:${minutes}:${seconds}`;
  const dateString = now.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const displayElement1 = document.getElementById('calender');
  displayElement1.textContent = `${dateString}`;
  const displayElement2 = document.getElementById('time');
  displayElement2.textContent = `${timeString}`;
}