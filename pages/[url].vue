<template>
  <div>
    <p>Title: {{ data.title }}</p>
    <p>Subtext: {{ data.subtext }}</p>
    <div v-html="data.pageContent"></div>
  </div>
</template>

<script setup lang="ts">
import { fetchContentPage } from '~/utils/fetchContentPage.js';
const route = useRoute();
const data = await fetchContentPage(`/${route?.params?.url}`);
</script>