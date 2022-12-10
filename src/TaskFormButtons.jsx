import React, { useState } from 'react';

const TaskFormButtons = ({ setTasks }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false
  });

  const handleSubmit = e => {
    e.preventDefault();

    // TODO: Validate form data

    // Add new task to local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ ...task, id: Date.now() });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Update the tasks state
    setTasks(tasks);

    // Reset the form
    setTask({
      title: '',
      description: '',
      completed: false
    });
  };

  return (
    <div className="form-buttons">
      <button type="submit" onClick={handleSubmit}>
        Add Task
      </button>
      {/* TODO: Add logic to cancel and clear form */}
    </div>
  );
};

export default TaskFormButtons;
