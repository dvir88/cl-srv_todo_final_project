import React from 'react';

const Task = ({ task, onToggleCompleted, onDeleteTask }) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleCompleted(task)}
        />
        {task.title}
      </label>
      <button className="delete-btn" onClick={() => onDeleteTask(task._id)}>
        Delete
      </button>
    </li>
  );
};

export default Task;
