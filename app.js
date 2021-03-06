const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

loadEventListener();

function loadEventListener() {
   form.addEventListener("submit", checkForTask);
   taskList.addEventListener("click", removeTask);
   clearBtn.addEventListener("click", clearTasks);
   filter.addEventListener("keyup", filterTasks);
}

function checkForTask(e) {
   if (taskInput.value === "") {
      alert("Add a task");
   } else {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(taskInput.value));

      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fa fa-remove"></i>';

      li.appendChild(link);
      taskList.appendChild(li);

      addTaskToLocalStorage(taskInput.value);

      taskInput.value = "";
   }

   e.preventDefault();
}

function addTaskToLocalStorage(task) {
   let tasks = [];
   if (localStorage.getItem("tasks") === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }

   tasks.push(task);

   localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
   if (e.target.parentElement.classList.contains("delete-item")) {
      if (confirm("Are you sure?")) {
         e.target.parentElement.parentElement.remove();
      }
   }
}

function clearTasks() {
   if (confirm("Are you sure?")) {
      while (taskList.firstChild) {
         taskList.removeChild(taskList.firstChild);
      }

      // document.querySelectorAll(".collection-item").forEach(function () {
      //    document.querySelector(".collection-item").remove();
      // });
   }
}

function filterTasks(e) {
   const text = e.target.value.toLowerCase();

   document.querySelectorAll(".collection-item").forEach(function (task) {
      const item = task.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
         task.style.display = "block";
      } else {
         task.style.display = "none";
      }
   });
}
