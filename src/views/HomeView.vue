<script setup>
import { useAuthStore } from "../stores/auth";
import UserInfoCard from "../components/UserInfoCard.vue";
import { NGrid, NGridItem } from "naive-ui";
const authStore = useAuthStore();
authStore.reload();
</script>

<template>
  <n-grid cols="1 m:2" :x-gap="12" :y-gap="8" responsive="screen">
    <n-grid-item>
      <user-info-card :user-info="authStore.getUserInfo"></user-info-card>
    </n-grid-item>
  </n-grid>
  <!-- no need parentheses(braket) when using pinia getters -->
  <!-- {{ authStore.getUserInfo }} -->
</template>
