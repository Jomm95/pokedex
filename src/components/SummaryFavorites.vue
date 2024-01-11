<template>
  <div>
    <h2>Your chosen favorite Pokémon</h2>
    <p v-if="favoriteListLength < maximumList">
      I can't choose, help me <button class="nes-btn is-success" @click="startInterval">Pick Pokémon</button>
    </p>
    <p v-for="(pokemonName, index) in favorites" :key="index" class="chosen-pokemon">
      <img src="../assets/pokeball.png" alt="pokeball" />
      {{ pokemonName }}
    </p>
    <p v-if="favoriteListLength > 1 && favoriteListLength < maximumList">
      You can add {{ maximumList - favoriteListLength }} more Pokémon
    </p>
    <p v-if="favoriteListLength > 9">
      Your list is full!
    </p>
    <p v-if="favoriteListLength > 9">
      Do you want to <button class="nes-btn is-error" @click="emptyFavoritePokemonList">Delete</button> the list?
    </p>
    <router-link v-if="favoriteListLength > 0" class="nes-btn" to="/favorites">
      View your favorite Pokémon
    </router-link>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'SummaryFavorites',
  props: {
    pokemonList: {
      type: Array,
      required: true,
    },
    favorites: {
      type: Array,
      required: true,
    },
    addFavorite: {
      type: Function,
      required: true,
    },
    eraseFavoritePokemonList: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const maximumList = ref(10);
    const favoriteListLength = computed(() => props.favorites.length);

    const startInterval = () => {
      const intervalID = window.setInterval(pickRandomPokemonOrClearInterval, 500);

      function pickRandomPokemonOrClearInterval() {
        if (favoriteListLength.value < maximumList.value) {
          pickRandomPokemon();
        } else {
          clearInterval(intervalID);
        }
      }
    };

    const pickRandomPokemon = () => {
      const list = props.pokemonList.filter((pokemon) => !props.favorites.includes(pokemon.name));
      const number = Math.floor(Math.random() * list.length);
      props.addFavorite(list[number].name);
    };

    const emptyFavoritePokemonList = () => {
      props.eraseFavoritePokemonList();
    };

    return {
      maximumList,
      favoriteListLength,
      startInterval,
      pickRandomPokemon,
      emptyFavoritePokemonList,
    };
  },
};
</script>

<style scoped>
.chosen-pokemon {
  text-transform: capitalize;
}
</style>
