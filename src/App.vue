<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import RouteNames from '@/router/constants.ts';

const router = useRouter();

const goToHome = () => {
  router.push({ name: RouteNames.HOME });
}
</script>

<template>
  <div>
    <v-toolbar color="pink">
      <v-toolbar-title text="Todolist App"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="goToHome" icon="mdi-export"></v-btn>
    </v-toolbar>
    <RouterView />
  </div>
</template>