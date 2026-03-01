let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  document.getElementById("taskCount").textContent =
    "Tổng số công việc: " + tasks.length;
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({ text: text, completed: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

renderTasks();
document.getElementById("taskInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      addTask();
    }
});