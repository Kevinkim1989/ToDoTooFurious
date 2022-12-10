// TaskForm.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    // Validate the input
    if (!title || !description) {
      return;
    }

    // Get the existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Generate a new task id
    const id = Date.now();

    // Add the new task to the tasks array
    tasks.push({ id, title, description });

    // Save the tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear the form inputs
    setTitle('');
    setDescription('');
  };

  return (
    // Use the Form and Button components from react-bootstrap
    // to render the form and buttons
    <Form onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      <Form.Group>
        <Form.Label htmlFor="title">Title:</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="description">Description:</Form.Label>
        <Form.Control
          id="description"
          as="textarea"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;
