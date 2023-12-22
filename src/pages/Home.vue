<template>
    <!-- Main container for the component -->
    <div class="select-pokemon-page">
      <!-- Pokémon logo image -->
      <img src="./../assets/logo-pixel.gif" alt="pokémon" />
      
      <!-- Container for Pokémon List and Summary Favorites components -->
      <div class="select-pokemon-content">
        <!-- Pokémon List component -->
        <PokemonList
          :pokemon-list="statePokemonDataList"
          :favorites="stateFavoritePokemonList"
          @deleteFavorite="deleteFavorite"
          @addFavorite="addFavorite"
        />
  
        <!-- Summary Favorites component -->
        <SummaryFavorites
          :pokemon-list="statePokemonDataList"
          :favorites="stateFavoritePokemonList"
          @addFavorite="addFavorite"
          @eraseFavoritePokemonList="eraseFavoritePokemonList"
        />
      </div>
    </div>
  </template>
  
  <script>
  // Import necessary components and functions from Vue and Vuex
  import PokemonList from '@/components/PokemonList.vue';
  import SummaryFavorites from '@/components/SummaryFavorites.vue';
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    // Declare components used in this component
    components: {
      PokemonList,
      SummaryFavorites,
    },
    // Define the component logic using the setup function of Vue 3
    setup() {
      // Access the Vuex store
      const store = useStore();
  
      // Reactive variables for state management
      const statePokemonDataList = computed(() => store.state.statePokemonDataList);
      const stateFavoritePokemonList = computed(() => store.state.stateFavoritePokemonList);
  
      // Lifecycle hook: runs when the component is mounted
      onMounted(async () => {
        // Fetch Pokémon data and set it in the Vuex store
        const pokemonData = await getPokemonData();
        setPokemonData(pokemonData);
      });
  
      // Asynchronous function to fetch Pokémon data
      const getPokemonData = async () => {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const json = await data.json();
        return json.results;
      };
  
      // Function to set Pokémon data in the Vuex store
      const setPokemonData = (list) => {
        store.dispatch('setPokemonData', list);
      };
  
      // Functions to perform actions related to favorite Pokémon
      const addFavorite = (payload) => {
        store.dispatch('addFavorite', payload);
      };
  
      const deleteFavorite = (payload) => {
        store.dispatch('deleteFavorite', payload);
      };
  
      const eraseFavoritePokemonList = () => {
        store.dispatch('eraseFavoritePokemonList');
      };
  
      // Return variables and functions for use in the template
      return {
        statePokemonDataList,
        stateFavoritePokemonList,
        getPokemonData,
        setPokemonData,
        addFavorite,
        deleteFavorite,
        eraseFavoritePokemonList,
      };
    }
  }
  </script>
  
  <style scoped>
    /* Styling specific to this component */
    .select-pokemon-page {
      text-align: center;
    }
  
    .select-pokemon-content {
      text-align: left;
      display: flex;
      justify-content: space-evenly;
    }
  </style>
  