import axios from 'axios';

const API_URL = 'http://localhost:5168/api/tasks';

export const createTask = async (task) => {
  return await axios.post(API_URL, task);
};

export const fetchTasks = async () => {
  return await axios.get(API_URL);
};