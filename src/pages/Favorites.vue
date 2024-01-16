<template>
  <div class="favorites-container">
    <h1 class="overview-favorite-pokemon__title">Your favorite Pokémon</h1>
    <router-link
      class="nes-btn"
      to="/home"
    >
      Go back
    </router-link>
    <div class="overview-favorite-pokemon">
      <pokemon-card
        v-for="(pokemon, index) in stateFavoritePokemonList"
        :key="index"
        :pokemon-name="pokemon"
        class="pokemon-card-background"
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

.favorites-container {
  height: 100vh;
  text-align: center;
  background-image: url('../assets/background-day.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow-y: auto;
}
.overview-favorite-pokemon {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.overview-favorite-pokemon__title {
  padding-top: 10px;
  text-align: center;
}
.pokemon-card-background {
  background-color: rgba(248, 249, 250, 0.5);
  margin: 15px;
  border-radius: 0px;
}

/* @media only screen and (min-width: 769px) and (max-width: 1024px) {


  .favorites-container {
    width:100vw;
  }
  .overview-favorite-pokemon {
    grid-template-columns: 1fr;
    width:60%;
    margin:auto;
  }
} */

@media only screen and (max-width: 1024px) {

  .favorites-container {
    width: 100vw;
  }

  .overview-favorite-pokemon {
    grid-template-columns: 1fr; /* Change to a single column layout for smaller devices */
    width: 70%;
    margin: auto;
  }
}
</style>
  