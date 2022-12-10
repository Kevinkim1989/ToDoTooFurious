import React from 'react';

const TaskFormFields = ({ title, description, onChange }) => (
  <>
    <label htmlFor="title">Title</label>
    <input
      type="text"
      id="title"
      name="title"
      value={title}
      onChange={onChange}
    />

    <label htmlFor="description">Description</label>
    <input
      type="text"
      id="description"
      name="description"
      value={description}
      onChange={onChange}
    />
  </>
);

export default TaskFormFields;