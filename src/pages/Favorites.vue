<template>
    <div>
      <h1 class="overview-favorite-pokemon__title">
        Your favorite Pokémon
      </h1>
      <router-link
        class="nes-btn"
        to="/"
      >
        Go back
      </router-link>
      <div class="overview-favorite-pokemon">
        <pokemon-card
          v-for="(pokemon, index) in stateFavoritePokemonList"
          :key="index"
          :pokemon-name="pokemon"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import PokemonCard from '@/components/PokemonCard';
  
  export default {
    components: {
      PokemonCard,
    },
    setup() {
      const store = useStore();
      const stateFavoritePokemonList = computed(() => store.state.stateFavoritePokemonList);
  
      return {
        stateFavoritePokemonList,
      };
    },
  };
  </script>
  
  <style scoped>
  .overview-favorite-pokemon {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  .overview-favorite-pokemon__title {
    margin-top: 10px;
    text-align: center;
  }
  </style>
  