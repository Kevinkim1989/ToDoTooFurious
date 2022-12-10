import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { Form, DropdownButton, Dropdown } from 'react-bootstrap';

const TaskList = () => {
  // Declare the tasks, sortOrder, and filter state variables
  // and the corresponding setter functions using the useState hook
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('all');

  // Define a function to load the tasks from local storage
  const loadTasks = () => {
    // Get the tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks'), ['id', 'title', 'description', 'status']) || [];
  
    // Apply the selected sort order and filter criteria to the tasks
    const sortedAndFilteredTasks = applySortAndFilter(tasks);

    // Update the tasks state
    setTasks(sortedAndFilteredTasks);
  };

  // Define a function to apply the selected sort order and filter criteria
  // to the tasks in the tasks state
  const applySortAndFilter = tasks => {
    // Apply the selected sort order
    if (sortOrder === 'asc') {
      tasks = tasks.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      tasks = tasks.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Apply the selected filter
    if (filter !== 'all') {
      tasks = tasks.filter(task => task.status === filter);
    }

    return tasks;
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

    // Update the tasks state with the updated tasks array
    setTasks(updatedTasks);
  };


  return (
    <div className="task-list">
      <h2>Task List</h2>
  
      <div className="d-flex justify-content-between mb-3">
        <DropdownButton title="Sort Order" className="mr-3">
          <Dropdown.Item onClick={() => setSortOrder('asc')}>Ascending</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOrder('desc')}>Descending</Dropdown.Item>
        </DropdownButton>
        <DropdownButton title="Filter">
          <Dropdown.Item onClick={() => setFilter('all')}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('pending')}>Pending</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter('completed')}>Completed</Dropdown.Item>
        </DropdownButton>
      </div>
  
      <ul>
        {applySortAndFilter(tasks).map(task => (
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


