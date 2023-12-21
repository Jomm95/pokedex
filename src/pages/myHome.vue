<template>
    <div class="select-pokemon-page">
      <img
        src="./../assets/logo-pixel.gif"
        alt="pokémon"
      >
      <div class="select-pokemon-content">
        <PokemonList
          :pokemon-list="statePokemonDataList"
          :favorites="stateFavoritePokemonList"
          @deleteFavorite="deleteFavorite"
          @addFavorite="addFavorite"
        />
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
  import PokemonList from '@/components/PokemonList.vue';
  import SummaryFavorites from '@/components/SummaryFavorites.vue';
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    components: {
      PokemonList,
      SummaryFavorites,
    },
    setup() {
      const store = useStore();
      const statePokemonDataList = computed(() => store.state.statePokemonDataList);
      const stateFavoritePokemonList = computed(() => store.state.stateFavoritePokemonList);
  
      onMounted(async () => {
        const pokemonData = await getPokemonData();
        setPokemonData(pokemonData);
      });
  
      const getPokemonData = async () => {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const json = await data.json();
        return json.results;
      };
  
      const setPokemonData = (list) => {
        store.dispatch('setPokemonData', list);
      };
  
      const addFavorite = (payload) => {
        store.dispatch('addFavorite', payload);
      };
  
      const deleteFavorite = (payload) => {
        store.dispatch('deleteFavorite', payload);
      };
  
      const eraseFavoritePokemonList = () => {
        store.dispatch('eraseFavoritePokemonList');
      };
  
      return {
        statePokemonDataList,
        stateFavoritePokemonList,
        getPokemonData,
        setPokemonData,
        addFavorite,
        deleteFavorite,
        eraseFavoritePokemonList,
      };
    },
  };
  </script>
  
  <style scoped>
  .select-pokemon-page {
    text-align: center;
  }
  
  .select-pokemon-content {
    text-align: left;
    display: flex;
    justify-content: space-evenly;
  }
  </style>
  