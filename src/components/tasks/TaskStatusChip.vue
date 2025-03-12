<script setup lang="ts">
import { TaskStatus } from '@/models/task.entity';
import { computed } from 'vue';

type Props = {
  status: TaskStatus
}

const props = defineProps<Props>()

const getStatus = (): string => {
  switch (props.status) {
    case TaskStatus.TODO:
      return 'A faire'
    case TaskStatus.IN_PROGRESS:
      return 'En cours'
    case TaskStatus.DONE:
      return 'Terminée'
    default:
      return 'A faire'
  } 
}

const getStatusColor = computed(() => {
  switch (props.status) {
  case TaskStatus.TODO:
      return 'red'
    case TaskStatus.IN_PROGRESS:
      return 'secondary'
    case TaskStatus.DONE:
      return 'green'
    default:
      return 'grey'
  }
});
</script>

<template>
  <v-chip variant="flat" :color="getStatusColor">{{ getStatus(props.status) }}</v-chip>
</template>