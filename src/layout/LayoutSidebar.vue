<script setup>
import { NLayoutSider, NA, NMenu, NIcon } from 'naive-ui';
import { ref, h } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { Home, Book } from '@vicons/ionicons5';

const route = useRoute();
const collapsed = ref(false);
const currentKey = ref(null);

// menu items
const menu = [
  {
    label: 'Home',
    key: 'home',
    path: '/',
    icon: Home,
  },
  {
    label: 'Courses',
    key: 'courses',
    path: '/courses',
    icon: Book,
    children: [
      {
        label: 'Course 1',
        key: 'course1',
        path: '/courses/62d27c16379f1726b3be623a',
      },
      {
        label: 'Course 2',
        key: 'course2',
        path: '/courses/62d27c16379f1726b3be623a',
      },
    ],
  },
];
const renderMenu = (menu) =>
  menu.map((item) => ({
    label: () => h(RouterLink, { to: item.path }, item.label),
    key: item.key,
    icon:
      item.icon != null
        ? () => h(NIcon, null, { default: () => h(item.icon) })
        : undefined,
    children: item.children ? renderMenu(item.children) : undefined,
  }));
const menuOptions = renderMenu(menu);


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
    <n-menu
      v-model:value="currentKey"
      :options="menuOptions"
      :collapsed="collapsed"
    />
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
