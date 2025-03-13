<script setup lang="ts">
import { computed, ref } from "vue";
import { TaskStatus, TaskEntity } from '@/models/task.entity';

type Props = {
  isEditionMode: Boolean,
  task?: TaskEntity | null
}

const { isEditionMode, task } = defineProps<Props>()

const isValid = ref(false);

const statusItems = [
  {
    label: 'A faire',
    value: TaskStatus.TODO,
  },
  {
    label: 'En cours',
    value: TaskStatus.IN_PROGRESS,
  },
  {
    label: 'Terminée',
    value: TaskStatus.DONE,
  }
]

const formData = ref({
  title: task && isEditionMode ? task.title : '',
  description: task &&  isEditionMode ? task.description : '',
  status: task && isEditionMode ? task.status : undefined
});

const emit = defineEmits(['create-task', 'update-task']);

const submitForm = () => {
  if (isValid.value) {
    if (isEditionMode) {
      emit('update-task', formData.value);
    } else {
      emit('create-task', { title: formData.value.title, description: formData.value.description });
    }

    formData.value = { title: '', description: '', status: task ? task.status : undefined };
  }
};

defineExpose({ submitForm });

const titleRules = computed(() => {
  return [
    value => {
      if (value) return true;

      return 'Le titre est requis.';
    },
    value => {
      if (value?.length <= 100) return true;

      return 'Le titre doit contenir moins de 100 caractères.';
    }
  ];
});

const descriptionRules = computed(() => {
  return [
    value => {
      if (value) return true;

      return 'La description est requise.';
    },
    value => {
      if (value?.length <= 500) return true;

      return 'La description doit contenir moins de 500 caractères.';
    }
  ];
});

</script>

<template>
  <v-form data-cy="task-form" v-model="isValid" ref="formRef" @submit.prevent>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            data-cy="task-form-title-field"
            v-model="formData.title"
            :rules="titleRules"
            label="Titre"
            required
          ></v-text-field>
        </v-col>
  
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            data-cy="task-form-description-field"
            v-model="formData.description"
            :rules="descriptionRules"
            label="Description"
            required
          ></v-text-field>
        </v-col>

        <v-col
          v-if="isEditionMode"
          cols="12"
          md="4"
        >
        <v-select
          v-model="formData.status"
          label="Statut"
          item-title="label"
          item-value="value"
          :items="statusItems"
        ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>