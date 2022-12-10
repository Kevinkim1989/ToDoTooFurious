import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  // Declare the tasks state variable and the setTasks state updater function
  // using the useState hook
  const [tasks, setTasks] = useState([]);

  // Define a function to load the tasks from local storage
  const loadTasks = () => {
    // Get the tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks'), ['id', 'title', 'description', 'status']) || [];
  
    // Update the tasks state
    setTasks(tasks);
  };

  useEffect(() => {
    // Load the tasks from local storage
    loadTasks();
  
    // Add an event listener to update the tasks state
    // when the local storage changes
    window.addEventListener('storage', loadTasks);
  
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('storage', loadTasks);
  }, []); // Remove the tasks state variable from the dependency array
  

  // Define a new function to handle deleting tasks
  const handleDelete = id => {
    // Get the existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Use the filter array method to return a new array of tasks
    // that does not include the task with the specified id
    const updatedTasks = tasks.filter(task => task.id !== id);

    // Save the updated tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Log the local storage
    console.log(localStorage);
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          // For each task in the tasks array, render a TaskItem component
          <TaskItem key={task.id} task={task} handleDelete={handleDelete} />
        ))}
      </ul>
      {/* Pass the loadTasks function to the TaskForm component as a prop */}
      <TaskForm loadTasks={loadTasks} />
    </div>
  );
};

export default TaskList;


