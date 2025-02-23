import React, { useState, useEffect } from "react";

function TodoApp() {
  // Load tasks from localStorage when the app starts
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : []; // Convert string to array
  });

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [shake, setShake] = useState(false);

  // Save tasks to localStorage whenever `tasks` changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle input change
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
    setShake(false);
  };

  // Handle priority change
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") {
      setShake(true);
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: priority,
      },
    ]);
    setNewTask("");
    setPriority("medium");
    setShake(false);
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Update task text
  const updateTask = (taskId, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Remove all tasks
  const removeAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="todo-app">
      <h1 className="todo-title">To-Do List</h1>

      <form onSubmit={handleAddTask} className={`task-form ${shake ? "shake" : ""}`}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a task"
          className="task-input"
        />
        <select value={priority} onChange={handlePriorityChange} className="priority-select">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="add-button">Add Task</button>
      </form>

      <div className="task-table-container">
        <table className="task-table">
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-tasks">No tasks yet. Add one above.</td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className={`task-item priority-${task.priority} ${task.completed ? "completed" : ""}`}
                >
                  <td className="task-checkbox-cell">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="task-checkbox"
                    />
                  </td>
                  <td className="task-text-cell">
                    <input
                      type="text"
                      value={task.text}
                      onChange={(e) => updateTask(task.id, e.target.value)}
                      className="task-text-input"
                      onBlur={(e) => updateTask(task.id, e.target.value.trim())}
                      onFocus={(e) => e.target.select()} // Select text on focus for easier editing
                    />
                  </td>
                  <td className="priority-label-cell">
                    <span className="priority-label">Priority: {task.priority}</span>
                  </td>
                  <td className="task-action-cell">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="delete-button"
                      title="Remove this task"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {tasks.length > 0 && (
        <button onClick={removeAllTasks} className="remove-all-button" title="Clear all tasks">
          Remove All
        </button>
      )}
    </div>
  );
}

export default TodoApp;
