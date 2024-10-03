import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5168/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5168/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error al borrar la tarea:', error);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`http://localhost:5168/api/tasks/${id}/complete`);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error('Error al completar la tarea:', error);
    }
  };
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completada') return task.isCompleted === true;
    if (filter === 'Pendiente') return task.isCompleted === false;
    return true;
  });

  return (
    <div>
        <TaskForm onTaskAdded={handleTaskAdded}/>
        <h1>Lista de Tareas</h1> 
        <div>
          <button className='filterbutton' onClick={() => setFilter('all')}>Todas las tareas</button>
          <button className='filterbutton' onClick={() => setFilter('Completada')}>Tareas completadas</button>
          <button className='filterbutton' onClick={() => setFilter('Pendiente')}>Tareas Pendientes</button>
        </div>    
        <ul>
            {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? 'task-completed' : ''}>
                {task.name} - {task.description} - {task.dueDate} - {task.isCompleted ? 'Completada' : 'Pendiente'}
                <button className='btn1' onClick={() => handleCompleteTask(task.id)}>Marcar como completada</button>
                <button className='btn1' onClick={() => handleDeleteTask(task.id)}>Borrar</button>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default TaskList;
