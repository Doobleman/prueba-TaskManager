import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5168/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    return (
        <div>
            <h1>Prueba Tecnica - Task Manager</h1>
            <TaskList tasks={tasks} />
        </div>
    );
};

export default App;
