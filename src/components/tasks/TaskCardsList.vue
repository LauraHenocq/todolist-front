<script setup lang="ts">
import { TaskEntity, TaskStatus } from '@/models/task.entity';
import TaskCard from '@/components/tasks/TaskCard.vue';

type Props = {
  tasks: TaskEntity[]
}

defineProps<Props>()

const emit = defineEmits(['task-clicked', 'delete-task']);

const emitTaskClicked = (taskId: string) => {
  emit('task-clicked', taskId)
};

const deleteTask = (taskId: string) => {
  emit('delete-task', taskId);
}

</script>

<template>
<v-container>
    <v-row>
      <v-col v-for="task in tasks" :key="task.id" cols="12" md="6">
        <TaskCard :task="task" @deleteTask="deleteTask"/>
      </v-col>
    </v-row>
  </v-container>
</template>
