import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      name,
      description,
      dueDate,
      completed: false,
    };

    try {
      const response = await axios.post('http://localhost:5168/api/tasks', newTask);
      onTaskAdded(response.data); 
      setName('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error al añadir la tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la tarea"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripcion de la Tarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button className="btn1" type="submit">Añadir Tarea</button>
    </form>
  );
};

export default TaskForm;
