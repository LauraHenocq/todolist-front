import type { TaskStatus } from "@/models/task.entity"

export type UpdateTaskInput = {
  title: string
  description: string
  status: TaskStatus;
}