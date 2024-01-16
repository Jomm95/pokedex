<template>
  <div class="right-column">
    <h3 class="title">Your chosen favorite Pokémon</h3>
    <div class="nes-container is-rounded transparent-bg">
      <div class="pokemon-list-container">
        <div v-if="favoriteListLength < maximumList">
          <p>
            I can't choose, help me 
          </p>
          <button class="nes-btn is-success pick-pokemon-btn" @click="startInterval">Pick Pokémon</button>
        </div>
        <div class="pokemon-list-container-b">
          <p v-for="(pokemonName, index) in favorites" :key="index" class="chosen-pokemon">
            <img src="../assets/pokeball.png" alt="pokeball" />
            {{ pokemonName }}
          </p>
        </div>
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
          View your favorites Pokémon
        </router-link>
      </div>
    </div>
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


.transparent-bg {
  background-color: rgba(248, 249, 250, 0.3);
}
.pokemon-list-container {
  max-height: 52vh;
  overflow-y: auto;
}
.pokemon-list-container-b {
  overflow-y: auto;
  max-height: 100vh;
}

.pick-pokemon-btn {
  margin-bottom: 1rem;;
}
.chosen-pokemon {
  text-transform: capitalize;
}

.pokemon-list-container::-webkit-scrollbar {
  width: 0px;
}

.pokemon-list-container::-webkit-scrollbar-thumb {
  background-color: #4caf50;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.pokemon-list-container::-webkit-scrollbar-thumb:hover {
  background-color: #45a049;
}

.pokemon-list-container::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  transition: background-color 0.3s ease;
}

@media only screen and (max-width: 1024px) {
  .right-column {
    width:80%;
    margin: auto;
    margin-top:25px;
  }
}
</style>
