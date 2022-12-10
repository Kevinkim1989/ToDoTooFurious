// TaskItem.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TaskItem = ({ task, handleDelete }) => {
  // Declare a state variable to store the task title and description
  // and the state updater functions for the input fields
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  // Declare a state variable to track whether the task is being edited
  const [isEditing, setIsEditing] = useState(false);

  // Define an event handler for the Edit button
  const handleEdit = () => {
    // Set the isEditing state variable to true
    // to enable the input fields
    setIsEditing(true);
  };

  // Define an event handler for the Cancel button
  const handleCancel = () => {
    // Set the isEditing state variable to false
    // to disable the input fields and reset the values
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Define an event handler for the Save button
  const handleSave = () => {
    // Validate the input
    if (!editTitle || !editDescription) {
      return;
    }

    // Get the existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Update the task in the tasks array with the edited values
    const updatedTask = { ...task, title: editTitle, description: editDescription };
    const updatedTasks = tasks.map(t => (t.id === task.id ? updatedTask : t));

    // Save the tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Set the isEditing state variable to false
    // to disable the input fields
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {/* Use a ternary operator to conditionally render
      either the input fields or the task title and description
      based on the isEditing state variable */}
      {isEditing ? (
        // If isEditing is true, render the input fields
        <Form>
          <Form.Group>
            <Form.Label htmlFor="editTitle">Title:</Form.Label>
            <Form.Control
              id="editTitle"
              type="text"
              value={editTitle}
              onChange={event => setEditTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="editDescription">Description:</Form.Label>
            <Form.Control
              id="editDescription"
              as="textarea"
              value={editDescription}
              onChange={event => setEditDescription(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      ) : (
        // If isEditing is false, render the task title and description
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(task.id)}>
            Delete
          </Button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
