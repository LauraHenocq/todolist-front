<script setup lang="ts">
import { computed, ref, watch } from 'vue';

type Props = {
  isOpen: boolean,
  taskId: string;
}

const { isOpen, taskId } = defineProps<Props>()

const isDialogOpen = ref(isOpen);

watch(() => isOpen, (newVal) => {
  isDialogOpen.value = newVal;
});

const emit = defineEmits(['delete-task', 'cancel']);

const cancel = () => {
  emit('cancel');
}

const deleteTask = () => {
  emit('delete-task', taskId);
  isDialogOpen.value = false;
}

</script>

<template>
  <v-dialog v-model="isDialogOpen" width="90%">
      <v-card title="Suppression">
        <v-card-subtitle>
           <span>Vous êtes sur le point de supprimer la tâche</span>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Annuler"
            @click="cancel"
          ></v-btn>
          <v-btn
            text="Valider"
            @click="deleteTask"
          ></v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>