<!-- components/LogoutButton.vue -->
<template>
    <button class="logout-button nes-btn is-warning" @click="logout">
        Exit from Pokedex    
    </button>
</template>
  
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const logout = () => {
            //reset pokemons lists
            store.dispatch('resetPokemonData');
            store.dispatch('eraseFavoritePokemonList');
            
            // Clear the username and navigate to the login view
            store.dispatch('clearUsername');
            // Assuming you have a login route named 'Login', replace it with the actual name of your login route
            router.push({ name: 'login' });
        };
        return {
            logout,
        };
    },
};
</script>

<style scoped>
.logout-button {
  display: block;
  margin: 7rem auto;
  padding: 3rem 3rem;
}
</style>
  