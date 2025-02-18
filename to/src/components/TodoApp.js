import React, { useState } from 'react';

function TodoApp() {
  // State for managing tasks
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Function to add a new task
  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([
        ...tasks,
        { text: taskInput, completed: false },
      ]);
      setTaskInput(''); // Clear the input
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>My Colorful To-Do List</h1>
      </header>

      <div className="input-section">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add your task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="todo-list">
        {tasks.map((task, index) => (
          <div key={index} className="todo-item">
            <span
              className={task.completed ? 'completed' : ''}
              onClick={() => toggleTaskCompletion(index)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
