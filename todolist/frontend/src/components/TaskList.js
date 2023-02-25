import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggleCompleted, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onToggleCompleted={onToggleCompleted}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
