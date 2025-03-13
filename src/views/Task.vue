<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import TaskStatusChip from '@/components/tasks/TaskStatusChip.vue';
import EditTaskButton from '@/components/forms/EditTaskButton.vue';
import type { UpdateTaskInput } from '../services/inputs/update-task.input';
import TaskEditionDialog from '@/components/dialogs/TaskEditionDialog.vue';
import Alert from '@/components/common/Alert.vue';
import { TaskEntity } from '@/models/task.entity';

const tasksStore = useTasksStore();
const { task } = storeToRefs(tasksStore);
const { handleUpdateTask, getTaskById } = tasksStore;

const isLoading = ref(false);

const route = useRoute();
const taskId = ref(route.params.id);
const taskLocale = ref<TaskEntity | null>(null);

const alertInfo = ref({
  title: '',
  text: '',
  type: 'info'
});

const isAlertVisible = ref(false);

// TASK EDITION
const isTaskEditionDialogOpen = ref(false);

const openTaskEditionDialog = () => {
  isTaskEditionDialogOpen.value = true;
}
const closeTaskEditionDialog = () => {
  isTaskEditionDialogOpen.value = false;
}

const updateTask = async (updateTaskInput: UpdateTaskInput) => {
  isLoading.value = true;
  try {
    await handleUpdateTask(task.value.id, updateTaskInput);
    alertInfo.value = {
      title: 'Tâche mise à jour',
      text: 'La tâche a été mise à jour avec succès.',
      type: 'success'
    };
    isAlertVisible.value = true;
  } catch {
    alertInfo.value = {
      title: 'Erreur lors de la mise à jour',
      text: 'Une erreur est survenue lors de la mise à jour de la tâche, réessaie.',
      type: 'error'
    };
    isLoading.value = false;
    isAlertVisible.value = true;
  }
  
  closeTaskEditionDialog();
}

onMounted(async () => {
  isLoading.value = true;
  await getTaskById(taskId.value);
  isLoading.value = false;
});

</script>

<template>
  <v-container>
    <Alert v-if="isAlertVisible" :type="alertInfo.type" :title="alertInfo.title" :text="alertInfo.text" @close="isAlertVisible = false" />
    <div v-if="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else-if="task">
      <TaskEditionDialog :is-open="isTaskEditionDialogOpen" :task=task @updateTask="updateTask" @cancel="closeTaskEditionDialog" />
      <p class="my-lg-8 my-4 text-lg-h4 text-h6 font-weight-medium">Détail d'une tâche</p>
      <p class="my-lg-8 my-4 text-lg-h3 text-h5 font-weight-medium">{{ task.title }}</p>
      <TaskStatusChip :status="task.status" />
      <p class="my-lg-8 my-4">{{ task.description }}</p>
      <EditTaskButton class="my-lg-8 my-4 text-center" @click="openTaskEditionDialog" />
    </div>
  </v-container>
</template>