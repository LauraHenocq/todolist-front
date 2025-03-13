import { TaskEntity, TaskStatus } from "@/models/task.entity";
import { defineStore } from "pinia";
import { ref } from "vue";
import { createTask, updateTask, deleteTask, getTasks, getTask } from '@/services';
import type { CreateTaskInput } from "@/services/inputs/create-task.input";
import type { UpdateTaskInput } from "@/services/inputs/update-task.input";

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<TaskEntity[]>([]);
  const task = ref<TaskEntity | null>(null);

  const getAllTasks = async (): Promise<void> => {
    const retrievedTasks = await getTasks();
    tasks.value = retrievedTasks.map(TaskEntity.fromApi);
  }

  const getTaskById = async (taskId: string): Promise<void> => {
    const retrievedTask = await getTask(taskId);
    task.value = TaskEntity.fromApi(retrievedTask);
  }

  const handleCreateTask = async (task: CreateTaskInput): Promise<void> => {
    const newTaskId = await createTask({ ...task , status: TaskStatus.TODO });
    tasks.value.push(new TaskEntity({ ...task, _status: TaskStatus.TODO, id: newTaskId}));
  }

  const handleUpdateTask = async (taskId: string, taskToUpdate: UpdateTaskInput): Promise<void> => {
    await updateTask(taskId, taskToUpdate);

    task.value = new TaskEntity({
      title: taskToUpdate.title,
      description: taskToUpdate.description,
      _status: taskToUpdate.status as TaskStatus,
      id: taskId,
    });

    tasks.value = tasks.value.map((task) =>
      task.id === taskId
        ? new TaskEntity({
            title: taskToUpdate.title,
            description: taskToUpdate.description,
            _status: taskToUpdate.status as TaskStatus,
            id: taskId,
          })
        : task,
    )
  }

  
  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId)
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  }

  return { tasks, task, getAllTasks, getTaskById, handleCreateTask, handleUpdateTask, handleDeleteTask }
});