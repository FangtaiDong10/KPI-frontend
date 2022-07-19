<script setup>
import { RouterLink, RouterView } from 'vue-router';
import {
  NConfigProvider,
  NGlobalStyle,
  darkTheme,
  NMessageProvider,
} from 'naive-ui';
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <RouterView />
      <n-global-style />
    </n-message-provider>
  </n-config-provider>
</template>
<style>
@import '@/assets/base.css';
</style>
