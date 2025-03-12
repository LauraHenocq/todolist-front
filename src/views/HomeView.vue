<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import CreateTaskButton from '@/components/forms/CreateTaskButton.vue';
import TaskCreationDialog from '@/components/dialogs/TaskCreationDialog.vue';
import TaskCardsList from '@/components/tasks/TaskCardsList.vue';
import TaskDeletionDialog from '@/components/dialogs/TaskDeletionDialog.vue';

const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);
const { getAllTasks, handleCreateTask, handleDeleteTask } = tasksStore;

const isLoading = ref(false);

// TASK CREATION
const isTaskCreationDialogOpen = ref(false);

const openTaskCreationDialog = () => {
  isTaskCreationDialogOpen.value = true;
}
const closeTaskCreationDialog = () => {
  isTaskCreationDialogOpen.value = false;
}

// TASK DELETION
const isTaskDeletionDialogOpen = ref(false);
const selectedTaskId = ref('');

const openTaskDeletionDialog = (taskId: string) => {
  isTaskDeletionDialogOpen.value = true;
  selectedTaskId.value = taskId;
}

const closeTaskDeletionDialog = () => {
  isTaskDeletionDialogOpen.value = false;
}

const deleteTask = (taskId: string) => {
  handleDeleteTask(taskId);
  closeTaskDeletionDialog();
}

onMounted(async () => {
  isLoading.value = true;
  await getAllTasks();
  isLoading.value = false;
})

</script>

<template>
  <main>
    <v-app>
      <TaskCreationDialog :is-open="isTaskCreationDialogOpen" @createTask="handleCreateTask" @cancel="closeTaskCreationDialog" />
      <TaskDeletionDialog :is-open="isTaskDeletionDialogOpen" :taskId="selectedTaskId" @deleteTask="deleteTask" @cancel="closeTaskDeletionDialog" />
      <CreateTaskButton @click="openTaskCreationDialog" />
      <v-card  class="mx-auto" width="90%">
        <v-toolbar color="pink">

          <v-toolbar-title>Ma liste de tâches</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <TaskCardsList :tasks="tasks" @deleteTask="openTaskDeletionDialog" />
      </v-card>
    </v-app>
  </main>
</template>
