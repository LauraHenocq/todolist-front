<script setup lang="ts">
import TaskForm from '@/components/forms/TaskForm.vue';
import type { CreateTaskInput } from "@/services/inputs/create-task.input";
import { computed, ref, watch } from 'vue';

type Props = {
  isOpen: boolean
}

const { isOpen } = defineProps<Props>()

const formRef = ref(null);
const isDialogOpen = ref(isOpen);

watch(() => isOpen, (newVal) => {
  isDialogOpen.value = newVal;
});

const submitForm = () => {
  if (formRef.value) {
    formRef.value?.submitForm();
  }
};

const emit = defineEmits(['create-task', 'cancel']);

const cancel = () => {
  emit('cancel');
}

const createTask = (newTask: CreateTaskInput) => {
  emit('create-task', newTask);
  isDialogOpen.value = false;
}

</script>

<template>
  <v-dialog data-cy="task-creation-dialog" v-model="isDialogOpen" width="90%">
      <v-card title="Créer une nouvelle tâche">
        <TaskForm is-edition-mode="false" ref="formRef" @createTask="createTask"/>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            data-cy="cancel-creation-task-button"
            text="Annuler"
            @click="cancel"
          ></v-btn>
          <v-btn
            data-cy="validate-creation-task-button"
            text="Valider"
            @click="submitForm"
          ></v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>