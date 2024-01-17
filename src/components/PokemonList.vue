<template>
  <div class="left-column">
    <h3 class="title">Choose your Pokémon</h3>
    <div class="nes-container is-rounded transparent-bg">
      <div class="pokemon-list-container">
        <p v-for="(pokemon, index) in pokemonList" :key="pokemon.url" class="pokemon-list-item">
          {{ index + 1 + '. ' }}
          <i v-if="favorites.includes(pokemon.name)" class="nes-icon is-small heart" />
          <i v-else class="nes-icon is-small heart is-empty" />
          {{ pokemon.name }}
          <img :key="pokemon.url" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`" alt="Pokemon" />
          <button
            v-show="!favorites.includes(pokemon.name)"
            class="nes-btn"
            :class="{ 'is-disabled': favoriteListLength === 10 }"
            @click="setFavorites(pokemon.name); playPokemonCry(index + 1)"
          >
            Pick me!
          </button>
          <button
            v-show="favorites.includes(pokemon.name)"
            class="nes-btn is-error"
            @click="setFavorites(pokemon.name); playPokemonCry(index + 1)"
          >
            Remove
          </button>
        </p>
      </div>
    </div>


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

    return {
      favoriteListLength,
      setFavorites,
      playPokemonCry,
    };
  },
};
</script>

<style scoped>

.transparent-bg {
  background-color: rgba(248, 249, 250, 0.3);
}

.pokemon-list-container {
  max-height: 52vh;
  text-transform: capitalize;
  overflow-y: auto; 
}

.pokemon-list-item {
  display: flex;
  align-items: center;
}

.pokemon-list-container::-webkit-scrollbar {
  width: 0px; /* Set the width of the scrollbar */
}

.pokemon-list-container::-webkit-scrollbar-thumb {
  background-color: #4caf50;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}
/* Hover effect for the scrollbar thumb */
.pokemon-list-container::-webkit-scrollbar-thumb:hover {
  background-color: #45a049;
}

.pokemon-list-container::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  transition: background-color 0.3s ease;
}

.heart {
  margin-right: 5px;
}

@media only screen and (max-width: 1024px) {
  .left-column {
    width:80%;
    margin:auto;
  }
}

@media only screen and (max-width: 768px) {
  .pokemon-list-item img {
    width: 60px; /* Adjust the width of the Pokémon image for smaller screens */
    height: 60px; /* Adjust the height of the Pokémon image for smaller screens */
  }
  .pokemon-list-item button {
    width: 25%; /* Adjust the width of the Pokémon image for smaller screens */
    height: 20%; /* Adjust the height of the Pokémon image for smaller screens */
  }
}

@media only screen and (max-width: 480px) {
  .pokemon-list-item img {
    margin:0;
    width: 40px; /* Adjust the width of the Pokémon image for smaller screens */
    height: 40px; /* Adjust the height of the Pokémon image for smaller screens */
  }
  .pokemon-list-item button {
    width: 50%; /* Adjust the width of the Pokémon image for smaller screens */
    height: 20%; /* Adjust the height of the Pokémon image for smaller screens */
  }
}


</style>
