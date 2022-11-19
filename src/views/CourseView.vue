<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import { getCourse, getLectureList } from "../api/course";
import {
  NSpace,
  NCard,
  NDivider,
  NH1,
  NH3,
  NP,
  NGrid,
  NGridItem,
} from "naive-ui";
import CourseDetails from "../components/CourseDetails.vue";
import CourseLecture from "../components/CourseLecture.vue";

import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const route = useRoute();
const courseData = ref(null);
const lectureList = ref([]);

const isPurchased = ref(null);

watchEffect(async () => {
  if (route.params.id) {
    const course = await getCourse(route.params.id);
    courseData.value = course;
    document.title = course.name;
    lectureList.value = await getLectureList(route.params.id);
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
    <n-divider></n-divider>

    <n-card v-if="isPurchased === false">
      <n-space vertical align="center">
        <n-h3> You haven't purchased this course</n-h3>
        <n-p> Please contact teachers or admins to order it</n-p>
      </n-space>
    </n-card>

    <div v-else>
      <n-grid :cols="3" x-gap="24" y-gap="12">
        <n-grid-item v-for="lecture in lectureList" :key="lecture.id">
          <course-lecture
            :lecture="lecture"
            :courseId="courseData.id"
          ></course-lecture>
        </n-grid-item>
      </n-grid>
    </div>
  </n-space>
</template>

<style scoped>
.course-data {
  color: grey;
}
</style>
