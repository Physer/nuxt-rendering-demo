<template>
  <div>
    <p>Select a page:</p>
    <li v-for="route in routes">
      <a :href="route">{{ route }}</a>
    </li>
  </div>
</template>

<script setup lang="ts">
const routes = await buildRoutes([contentTypes.contentPage]);
</script>