<!-- components/LogoutButton.vue -->
<template>
    <button class="logout-desktop-button nes-btn is-warning" @click="logout">
        Exit from Pokedex    
    </button>

    <button class="logout-mobile-button nes-btn is-warning mobile-button" @click="logout">
        <i class="fa-solid fa-right-from-bracket"></i>
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
.logout-desktop-button {
  position:absolute;
  display: block;
  padding: 1rem 1rem;
  right: 1rem;
  top: 2rem;
}

.logout-mobile-button {
    display: none;
}

@media only screen and (max-width: 1024px) {
  .logout-desktop-button {
    display: none;
  }
  .logout-mobile-button {
    display: block;
    position:absolute;
    display: block;
    right: 1rem;
    top: 2rem;
    font-size: 2rem;
  }
}
</style>
  