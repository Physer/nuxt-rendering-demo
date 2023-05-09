<template>
  <div>
    <p>Select a page:</p>
    <ul>
      <li v-for="page in  pages ">
        <NuxtLink :to=page.url>{{ page.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getContentPages } from '../getContentPages';

const config = useRuntimeConfig();
const pages = await getContentPages(config?.public);
</script>