<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { NConfigProvider, NGlobalStyle, darkTheme } from 'naive-ui';
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />
    <RouterView />
  </n-config-provider>
</template>
<style>
@import '@/assets/base.css';
</style>
