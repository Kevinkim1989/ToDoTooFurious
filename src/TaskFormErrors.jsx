import React, { useState } from 'react';

const TaskFormErrors = ({ errors }) => {
  return (
    <div>
      {errors.map(error => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
};

export default TaskFormErrors;
