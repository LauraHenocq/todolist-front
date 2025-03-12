import type { TaskStatus } from "@/models/task.entity"

export type CreateTaskInput = {
  title: string
  description: string
  status?: TaskStatus;
}
  