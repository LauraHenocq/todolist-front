<script setup lang="ts">
import { TaskEntity } from '@/models/task.entity';
import TaskStatusChip from '@/components/tasks/TaskStatusChip.vue';


type Props = {
  task: TaskEntity[]
}

defineProps<Props>()

const emit = defineEmits(['delete-task']);

const editTask = (task: TaskEntity) => {
  console.log('modifier la tâche');
};

const deleteTask = (taskId: string) => {
  emit('delete-task', taskId);
};

</script>
<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ task.title }}</span>
    </v-card-title>
    <v-card-subtitle>
      <span>{{ task.description }}</span>
    </v-card-subtitle>
    <v-card-text>
      <TaskStatusChip :status="task.status" />
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="editTask(task)">Modifier</v-btn>
      <v-btn text @click="deleteTask(task.id)">Supprimer</v-btn>
    </v-card-actions>
  </v-card>
</template>