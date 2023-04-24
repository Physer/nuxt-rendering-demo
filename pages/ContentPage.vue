<template>
    <div>
        <p>Title: {{ data.title }}</p>
        <p>Subtext: {{ data.subtext }}</p>
        <div v-html="data.pageContent"></div>
    </div>
</template>

<script setup lang="ts">
const data = await fetchContentPage('/content-page');
</script>
