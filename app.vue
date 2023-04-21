<template>
  <div>
    {{ contentPages  }}
  </div>
</template>

<script setup="ts">
const contentPages = await fetchContentPages();
</script>
