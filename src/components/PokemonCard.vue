<template>
  <div v-if="pokemonData && pokemonDescription" class="pokemon-card nes-container is-rounded">
    <div class="pokemon-card__image">
      <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`" :alt="pokemonData.name" />
    </div>
    <div class="pokemon-card__text">
      <p>Name: {{ pokemonData.name }}</p>
      <p>No. {{ pokemonData.id }}</p>
      <p>
        Type:
        <span v-for="(typesOfPokemon, index) in pokemonData.types" :key="`type${index}`">
          {{ typesOfPokemon.type.name }}
          <span v-if="index < pokemonData.types.length - 1"> / </span>
        </span>
      </p>
      <p>{{ pokemonDescription[0].flavor_text }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'PokemonCard',
  props: {
    pokemonName: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const pokemonData = ref(null);
    const pokemonDescription = ref(null);

    const getDataSpecificPokemon = async (name) => {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
      const json = await data.json();
      pokemonData.value = json;
    };

    const getPokemonDescription = async () => {
      const data = await fetch(`${pokemonData.value.species.url}`);
      const json = await data.json();
      pokemonDescription.value = json.flavor_text_entries.filter((element) => element.language.name === 'en');
    };

    onMounted(async () => {
      if (props.pokemonName) {
        await getDataSpecificPokemon(props.pokemonName);
        await getPokemonDescription();
      }
    });

    return {
      pokemonData,
      pokemonDescription,
    };
  }
};
</script>

<style scoped>
.pokemon-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
}

.pokemon-card__text p:nth-child(odd) {
  text-transform: capitalize;
}
</style>
