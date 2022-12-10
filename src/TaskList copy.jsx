import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm'; // Import the TaskForm component
import TaskItem from './TaskItem';

const TaskList = () => {
  // Declare the tasks state variable and the setTasks state updater function
  // using the useState hook
  const [tasks, setTasks] = useState([]);

  // Use the useEffect hook to load the tasks from local storage
  // when the component is mounted, and update the tasks state
  // whenever the local storage changes
  useEffect(() => {
    // Get the tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Update the tasks state
    setTasks(tasks);

    // Add an event listener to update the tasks state
    // when the local storage changes
    window.addEventListener('storage', () => {
      // Get the updated tasks from local storage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      // Update the tasks state
      setTasks(tasks);
    });

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('storage', () => {});
  }, []);

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <TaskForm />
    </div>
  );
};


export default TaskList;