<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import { getCourse } from "../api/course";

const route = useRoute();
const courseData = ref({});

watchEffect(async () => {
  if (route.params.id) {
    const course = await getCourse(route.params.id);
    courseData.value = course;
  }
});
</script>
<template>Course Page for {{ courseData }}</template>
