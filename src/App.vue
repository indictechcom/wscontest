<script setup>
import navigation from './components/navbar.vue';
import router from './router';
</script>

<template>
  <div class="App">
    <div class="top-bar">
    <navigation />
    </div>
  </div>
  
</template>

  

<style scoped>
  .App{
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .top-bar{
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  
</style>





