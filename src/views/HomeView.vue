<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import CreateTaskButton from '@/components/forms/CreateTaskButton.vue';
import TaskCreationDialog from '@/components/dialogs/TaskCreationDialog.vue';
import TaskCardsList from '@/components/tasks/TaskCardsList.vue';
import TaskDeletionDialog from '@/components/dialogs/TaskDeletionDialog.vue';
import Alert from '@/components/common/Alert.vue';
import type { CreateTaskInput } from '../services/inputs/create-task.input';
import { useRouter } from 'vue-router';
import RouteNames from '@/router/constants.ts';

const router = useRouter();

const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);
const { getAllTasks, handleCreateTask, handleDeleteTask } = tasksStore;

const alertInfo = ref({
  title: '',
  text: '',
  type: 'info'
});

const isAlertVisible = ref(false);

const isLoading = ref(false);

// TASK CREATION
const isTaskCreationDialogOpen = ref(false);

const openTaskCreationDialog = () => {
  isTaskCreationDialogOpen.value = true;
}
const closeTaskCreationDialog = () => {
  isTaskCreationDialogOpen.value = false;
}

const createTask = async (createTaskInput: CreateTaskInput) => {
  isLoading.value = true;
  try {
    await handleCreateTask(createTaskInput);
    alertInfo.value = {
      title: 'Tâche créée',
      text: 'La tâche a été créée avec succès.',
      type: 'success'
    };
    isAlertVisible.value = true;
  } catch {
    alertInfo.value = {
      title: 'Erreur lors de la création',
      text: 'Une erreur est survenue lors de la création de la tâche, réessaie.',
      type: 'error'
    };
    isAlertVisible.value = true;
  } finally {
    isLoading.value = false;
  }
  
  closeTaskCreationDialog();
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

// GO TO TASK
const goToTask = async (taskId: string) => {
  router.push({ name: RouteNames.TASK_INFORMATION, params: { id: taskId } });
} 

const deleteTask = async (taskId: string) => {
  isLoading.value = true;
  try {
    await handleDeleteTask(taskId);
    alertInfo.value = {
      title: 'Tâche supprimée',
      text: 'La tâche a été supprimée avec succès.',
      type: 'success'
    };
    isAlertVisible.value = true;
  } catch {
    alertInfo.value = {
      title: 'Erreur lors de la suppression',
      text: 'Une erreur est survenue lors de la suppression de la tâche, réessaie.',
      type: 'error'
    };
    isAlertVisible.value = true;
  } finally {
    isLoading.value = false;
  }
  closeTaskDeletionDialog();
}

onMounted(async () => {
  isLoading.value = true;
  await getAllTasks();
  isLoading.value = false;
});

</script>

<template>
  <main>
    <v-app class="app">
      <div v-if="isLoading">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else>
        <TaskCreationDialog :is-open="isTaskCreationDialogOpen" @createTask="createTask" @cancel="closeTaskCreationDialog" />
        <TaskDeletionDialog :is-open="isTaskDeletionDialogOpen" :taskId="selectedTaskId" @deleteTask="deleteTask" @cancel="closeTaskDeletionDialog" />
        <CreateTaskButton @click="openTaskCreationDialog" />
        <Alert v-if="isAlertVisible" :type="alertInfo.type" :title="alertInfo.title" :text="alertInfo.text" @close="isAlertVisible = false" />
        <v-card  class="mx-auto" width="90%">
          <v-toolbar color="pink">

            <v-toolbar-title>Ma liste de tâches</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>
          <TaskCardsList :tasks="tasks" @deleteTask="openTaskDeletionDialog" @goToTask="goToTask" />
        </v-card>
      </div>
    </v-app>
  </main>
</template>
