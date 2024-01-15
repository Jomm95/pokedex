Background.vue

<template>
    <div :class="backgroundClass">
      <!-- Your background content here -->
      <slot></slot>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch } from 'vue';
  
  export default {
    setup() {
      const isDaytime = ref(false); // You can set the initial value based on your logic
  
      const backgroundClass = computed(() => (isDaytime.value ? 'day-background' : 'night-background'));
  
      watch(isDaytime, (newVal) => {
        // Optionally: Perform any actions when the background changes
      });
  
      // Optionally: Perform any initialization logic
  
      return {
        backgroundClass,
        isDaytime,
      };
    },
  };
  </script>
  
  <style scoped>
  .day-background {
    background-image: url('../assets/background-day.png');
  }
  
  .night-background {
    height: 100vh;
    text-align: center;
    background-image: url('../assets/background-night.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow-y: auto;
    color:white
  }
  
  /* Additional styling for the background component */
  </style>
  