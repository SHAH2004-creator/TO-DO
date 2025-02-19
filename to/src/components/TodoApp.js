document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const prioritySelect = document.getElementById("priority-select");
  const taskList = document.getElementById("task-list");
  const clearTasksButton = document.getElementById("clear-tasks");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.priority} ${
        task.completed ? "completed" : ""
      }`;

      const span = document.createElement("span");
      span.textContent = task.text;
      li.appendChild(span);

      // Buttons
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "task-buttons";

      const completeButton = document.createElement("button");
      completeButton.textContent = task.completed ? "Undo" : "Complete";
      completeButton.className = "complete";
      completeButton.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });
      buttonContainer.appendChild(completeButton);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit";
      editButton.addEventListener("click", () => {
        const newText = prompt("Edit Task:", task.text);
        if (newText !== null) {
          task.text = newText.trim();
          saveTasks();
          renderTasks();
        }
      });
      buttonContainer.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";
      deleteButton.addEventListener("click", () => {
        tasks = tasks.filter((t) => t !== task);
        saveTasks();
        renderTasks();
      });
      buttonContainer.appendChild(deleteButton);

      li.appendChild(buttonContainer);
      taskList.appendChild(li);
    });
  };

  // Add Task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTask = {
      text: taskInput.value.trim(),
      priority: prioritySelect.value,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    prioritySelect.value = "medium";
  });

  // Clear All Tasks
  clearTasksButton.addEventListener("click", () => {
    tasks = [];
    saveTasks();
    renderTasks();
  });

  renderTasks();
});
