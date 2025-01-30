<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <h1>Meme Viewer</h1>
    <MemeList />
  </div>
</template>

<script>
import MemeList from './components/MemeList.vue'

export default {
  name: 'App',
  components: {
    MemeList
  }
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
