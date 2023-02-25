import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:8000/tasks');
      const tasks = await response.json();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };


  const handleToggleCompleted = async(updatedTask) => {
    console.log(updatedTask)
    updatedTask['completed'] = !updatedTask['completed']
    console.log(updatedTask)
    await fetch(`http://localhost:8000/tasks?id=${updatedTask._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({completed: updatedTask['completed'] }),
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task['_id'] === updatedTask['_id'] ? updatedTask : task))
    );
  };

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:8000/tasks/?id=${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task['_id'] !== taskId));
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleCompleted={handleToggleCompleted}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
