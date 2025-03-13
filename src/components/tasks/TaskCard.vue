<script setup lang="ts">
import { TaskEntity } from '@/models/task.entity';
import TaskStatusChip from '@/components/tasks/TaskStatusChip.vue';


type Props = {
  task: TaskEntity
}

const { task } = defineProps<Props>()

const emit = defineEmits(['delete-task', 'edit-task', 'go-to-task']);

const editTask = () => {
  emit('edit-task', task.id);
};

const deleteTask = () => {
  emit('delete-task', task.id);
};

const goToTask = () => {
  emit('go-to-task', task.id);
}

</script>
<template>
  <v-card>
    <div data-cy="task-card" class="task-card" @click="goToTask">
      <v-card-title>
        <span class="headline">{{ task.title }}</span>
      </v-card-title>
      <v-card-subtitle>
        <span>{{ task.description }}</span>
      </v-card-subtitle>
      <v-card-text>
        <TaskStatusChip :status="task.status" />
      </v-card-text>
    </div>
    <v-card-actions>
      <v-btn data-cy="task-card-edit-task-button" text @click="editTask(task)">Modifier</v-btn>
      <v-btn data-cy="task-card-delete-task-button" text @click="deleteTask(task.id)">Supprimer</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
.task-card {
  cursor: pointer;
}
</style>