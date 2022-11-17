<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import { getCourse } from "../api/course";
import { NSpace, NCard, NDivider, NH1 } from "naive-ui";
import CourseDetails from "../components/CourseDetails.vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const route = useRoute();
const courseData = ref(null);
const isPurchased = ref(null);
watchEffect(async () => {
  if (route.params.id) {
    const course = await getCourse(route.params.id);
    courseData.value = course;
    document.title = course.name;
  }

  if (
    authStore.getUserInfo?.user_type === "User.Admin" ||
    authStore.getUserInfo?.enrolled_courses
      .map((c) => c.id)
      .includes(route.params.id)
  ) {
    isPurchased.value = true;
  } else {
    isPurchased.value = false;
  }
});
</script>

<template>
  <n-space vertical v-if="courseData">
    <n-h1
      >{{ courseData.name }}
      <span class="course-data"> ({{ courseData.uni_course_code }})</span>
    </n-h1>

    <course-details
      :course="courseData"
      :isPurchased="isPurchased"
    ></course-details>
  </n-space>
</template>

<style scoped>
.course-data {
  color: grey;
}
</style>
