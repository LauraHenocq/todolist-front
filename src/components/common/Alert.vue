<script setup lang="ts">

const enum AlertType {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info'
}

type Props = {
  type: AlertType
  title: string
  text: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleClose = () => {
  emit('close');
}

</script>
<template>
  <v-alert
    class="alert"
    :type="type"
    :title="title"
    :text="text"
    closable
    @click:close="handleClose"
  ></v-alert>
</template>
<style scoped>
.alert {
  position: fixed;
  bottom: 20px;
  right: 20px;
  left: 20px;
  z-index: 1;
}
</style>