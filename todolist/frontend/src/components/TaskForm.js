import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, settitle] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, completed: false }),
    });
    const newTaskData = await response.json();
    console.log(newTaskData)
    onAddTask(newTaskData);
    settitle(newTaskData.title);
  };

  return (
    <form onSubmit={handleFormSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={(event) => settitle(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
