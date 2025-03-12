import { TaskEntity, TaskStatus } from "@/models/task.entity";
import { defineStore } from "pinia";
import { ref } from "vue";
import { createTask, deleteTask, getTasks } from '@/services';
import type { CreateTaskInput } from "@/services/inputs/create-task.input";

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<TaskEntity[]>([]);

  const getAllTasks = async () => {
    const retrievedTasks = await getTasks();
    tasks.value = retrievedTasks.map(TaskEntity.fromApi);
  }

  const handleCreateTask = async (task: CreateTaskInput) => {
    const newTaskId = await createTask({ ...task , status: TaskStatus.TODO });
    tasks.value.push(new TaskEntity({ ...task, status: TaskStatus.TODO, id: newTaskId}));
  }

  
  const handleDeleteTask = async (taskId: string) => {
    const response = await deleteTask(taskId)
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  }

  return { tasks, getAllTasks, handleCreateTask, handleDeleteTask }
});