<template>
  <div class="pokemon-list">
    <h2>Choose your Pokémon</h2>
    <p v-for="(pokemon, index) in pokemonList" :key="pokemon.url" class="pokemon-list-item">
      {{ index + 1 + '. ' }}
      <i v-if="favorites.includes(pokemon.name)" class="nes-icon is-small heart" />
      <i v-else class="nes-icon is-small heart is-empty" />
      {{ pokemon.name }}
      <img :key="pokemon.url" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`" alt="Pokemon" />
      <a
        v-show="!favorites.includes(pokemon.name)"
        class="nes-btn"
        :class="{ 'is-disabled': favoriteListLength === 10 }"
        @click="setFavorites(pokemon.name); playPokemonCry(index + 1)"
      >
        Pick me!
      </a>
      <button
        v-show="favorites.includes(pokemon.name)"
        class="nes-btn is-error"
        @click="setFavorites(pokemon.name); playPokemonCry(index + 1)"
      >
        Remove
      </button>
    </p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'PokemonList',
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
    deleteFavorite: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const favoriteListLength = computed(() => props.favorites.length);

    const setFavorites = (name) => {
      if (props.favorites.includes(name)) {
        const indexInArray = props.favorites.indexOf(name);
        props.deleteFavorite(indexInArray);
        return;
      }
      if (favoriteListLength.value < 10) {
        props.addFavorite(name);
      }
    };

    const playPokemonCry = (pokemonId) => {
      const audio = new Audio(`https://pokemoncries.com/cries-old/${pokemonId}.mp3`);
      audio.play();
    };

    onMounted(() => {
      // Additional setup logic can be placed here if needed
    });

    return {
      favoriteListLength,
      setFavorites,
      playPokemonCry,
    };
  },
};
</script>

<style scoped>
.pokemon-list {
  text-transform: capitalize;
}

.pokemon-list-item {
  display: flex;
  align-items: center;
}

.heart {
  margin-right: 5px;
}
</style>
