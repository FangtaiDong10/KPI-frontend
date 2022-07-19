import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "/home",
      component: () => Layout,
      children: [
        {
          name: "home",
          path: "/home",
          component: () => import("../views/HomeView.vue"),
          meta: {
            title: "Home",
            requiresAuth: true,
          },
        },
        {
          name: "courses",
          path: "/courses",
          component: () => import("../views/CoursesView.vue"),
          meta: {
            title: "Courses",
            requiresAuth: true,
          },
        },
        {
          name: "course",
          path: "courses/:id",
          component: () => import("../views/CourseView.vue"),
          meta: { title: "Course Page", requiresAuth: true },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth === true && !authStore.isLoggedIn) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || to.name;
});

export default router;
