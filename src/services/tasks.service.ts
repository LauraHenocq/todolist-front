import axios from 'axios';
import type { CreateTaskInput } from './inputs/create-task.input';

export const getTasks = async() => {
  const response = await axios.get(`${import.meta.env.VITE_TODOLIST_BACK_URL}/tasks`);
  return response.data;
}

export const createTask = async(task: CreateTaskInput) => {
  const response = await axios.post(`${import.meta.env.VITE_TODOLIST_BACK_URL}/tasks`, task);
  return response.data;
}

export const deleteTask = async(taskId: string) => {
  const response = await axios.delete(`${import.meta.env.VITE_TODOLIST_BACK_URL}/tasks/${taskId}`);
  return response.data;
}
