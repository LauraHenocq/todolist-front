<script setup lang="ts">
import { computed, ref } from "vue";

const isValid = ref(false);

const formData = ref({
  title: '',
  description: '',
});

const emit = defineEmits(['create-task']);

const submitForm = () => {
  if (isValid.value) {
    emit('create-task', formData.value);
    formData.value = { title: '', description: '' };
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
  <v-form v-model="isValid" ref="formRef" @submit.prevent>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
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
            v-model="formData.description"
            :rules="descriptionRules"
            label="Description"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>