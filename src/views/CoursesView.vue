<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect, onMounted } from "vue";
import { getCourseList } from "../api/course";

const route = useRoute();
const courseData = ref([]);

onMounted(async () => {
  courseData.value = await getCourseList();
});
</script>
<template>
  <p>Page: {{ courseData.page_num }}/{{ courseData.total_pages }}</p>
  <p>
    {{ courseData.items }}
  </p>
</template>
