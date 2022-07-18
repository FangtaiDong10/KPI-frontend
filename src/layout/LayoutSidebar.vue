<script setup>
import { NLayoutSider, NA } from 'naive-ui';
import { ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();
const collapsed = ref(false);
</script>

<template>
  <n-layout-sider
    bordered
    :width="240"
    show-trigger
    collapse-mode="width"
    v-model:collapsed="collapsed"
    :native-scrollbar="false"
  >
    <router-link to="/" custom v-slot="{ navigate, href }">
      <n-a class="logo" :href="href" @click="navigate">
        <img src="@/assets/kp_logo1.jpg" alt="" />
        <span>KPI System</span>
      </n-a>
    </router-link>
  </n-layout-sider>
</template>

<style lang="less" scoped>
.logo {
  position: sticky;
  top: 0;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 300;
  text-decoration: none;
  transition: padding 0.3s, font-size 0.3s;

  img {
    height: 32px;
    margin-right: 8px;
    transition: height 0.3s;
  }
}

.n-layout-sider--collapsed .logo {
  font-size: 0;
  padding: 12px;
  img {
    height: 22px;
    margin: auto;
  }
}
</style>
