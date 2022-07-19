<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
authStore.reload();
</script>

<template>
  <!-- no need parentheses(braket) when using pinia getters -->
  {{ authStore.getUserInfo }}
</template>
