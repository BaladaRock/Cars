<script setup lang="ts">
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
     <h1>Welcome to our cars app</h1>
  </header>
  
  <main>
    <div class="wrapper">
      <router-view></router-view> <!-- Use router-view to navigate between components -->
    </div>
  </main>
</template>

<style scoped>
@import "@/assets/styles/styles.css";
</style>