let input = document.querySelector(".info");
let submit = document.querySelector(".add");
let main = document.querySelector(".main-task");
let taskDiv = document.querySelector(".tasks");
let removeAll = document.querySelector(".remove-all");

// Empty Arrye
let arOfTasks = [];

// Check Tasks in Local Storage
if (localStorage.getItem("tasks")) {
  arOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Get Data From Local Storage Function
getDataFromLs();
// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArr(input.value);
    input.value = "";
  }
};
// Click On Task Element
taskDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTask(e.target.parentElement.getAttribute("data-id"));

    // Remove Element From Page
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    // Toggle Task
    toggleTask(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
  if (e.target.classList.contains("remove")) {
    taskDiv.innerHTML = "";
  }
});

function addTaskToArr(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Arrye Of Tasks
  arOfTasks.push(task);
  // Add Tasks To Page
  addElTopage(arOfTasks);
  // Add Tasks To Locla Storage
  addDataToLs(arOfTasks);
}

removeAll.addEventListener("click", () => {
  arOfTasks = [];
  addDataToLs(arOfTasks);
  taskDiv.innerHTML = "";
});

function addElTopage(arOfTasks) {
  // Empty Tasks Div
  taskDiv.innerHTML = "";
  arOfTasks.forEach((task) => {
    // Creat Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    console.log(date);
    let p = document.createElement("p");
    p.className = "date";
    p.appendChild(document.createTextNode(year + "/" + month + "/" + day));
    div.appendChild(p);
    // Creat Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Dive
    div.appendChild(span);

    taskDiv.appendChild(div);
  });
}

// Add Tasks To Locla Storage
function addDataToLs(arOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arOfTasks));
}
// // Get Data Frome Local Storage
function getDataFromLs() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElTopage(tasks);
  }
}

// Remove Task From Local Storage
function deleteTask(taskId) {
  arOfTasks = arOfTasks.filter((task) => task.id != taskId);
  addDataToLs(arOfTasks);
}

function toggleTask(taskId) {
  for (let i = 0; i < arOfTasks.length; i++) {
    if (arOfTasks[i].id == taskId) {
      arOfTasks[i].completed == false
        ? (arOfTasks[i].completed = true)
        : (arOfTasks[i].completed = false);
    }
  }
  addDataToLs(arOfTasks);
}
