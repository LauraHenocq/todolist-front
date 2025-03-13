import axios from 'axios';
import type { CreateTaskInput } from './inputs/create-task.input';
import type { UpdateTaskInput } from './inputs/update-task.input';

export const getTasks = async() => {
  const response = await axios.get(`${import.meta.env.VITE_TODOLIST_BACK_URL}/tasks`);
  return response.data;
}

export const getTask = async(taskId: string) => {
  const response = await axios.get(`${import.meta.env.VITE_TODOLIST_BACK_URL}/tasks/${taskId}`);
  return response.data;
}

export const createTask = async(task: CreateTaskInput) => {
  const response = await axios.post(`${import.meta.env.VITE_TODOLIST_BACK_URL}/tasks`, task);
  return response.data;
}

export const updateTask = async(taskId: string, task: UpdateTaskInput) => {
  const response = await axios.put(`${import.meta.env.VITE_TODOLIST_BACK_URL}/tasks/${taskId}`, task);
  return response.data;
}

export const deleteTask = async(taskId: string) => {
  const response = await axios.delete(`${import.meta.env.VITE_TODOLIST_BACK_URL}/tasks/${taskId}`);
  return response.data;
}
