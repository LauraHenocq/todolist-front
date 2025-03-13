<script setup lang="ts">
import TaskForm from '@/components/forms/TaskForm.vue';
import type { UpdateTaskInput } from "@/services/inputs/update-task.input";
import { computed, ref, watch } from 'vue';
import { TaskEntity } from '@/models/task.entity';

type Props = {
  isOpen: boolean,
  task: TaskEntity
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

const emit = defineEmits(['update-task', 'cancel']);

const cancel = () => {
  emit('cancel');
}

const updateTask = (newTask: UpdateTaskInput) => {
  emit('update-task', newTask);
  isDialogOpen.value = false;
}

</script>

<template>
  <v-dialog v-model="isDialogOpen" width="90%">
      <v-card title="Modifier la tâche">
        <TaskForm is-edition-mode="true" :task="task" ref="formRef" @updateTask="updateTask"/>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Annuler"
            @click="cancel"
          ></v-btn>
          <v-btn
            text="Valider"
            @click="submitForm"
          ></v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>