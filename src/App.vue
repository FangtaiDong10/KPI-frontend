<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { NConfigProvider, NGlobalStyle } from 'naive-ui';
</script>

<template>
  <n-config-provider>
    <n-global-style />
    <RouterView />
  </n-config-provider>
</template>

<style>
@import '@/assets/base.css';
</style>
