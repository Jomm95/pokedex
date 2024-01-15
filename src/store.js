import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      statePokemonDataList: [],
      stateFavoritePokemonList: JSON.parse(localStorage.getItem('favoritePokemonList')) || [],
      username: null,
      isAuthenticaded: false,
    };
  },
  actions: {
    setPokemonData(context, payload) {
      context.commit("setPokemonData", payload);
    },
    setFavoritePokemonList(context, payload) {
      context.commit("setFavoritePokemonList", payload);
    },
    addFavorite(context, payload) {
      context.commit("addFavorite", payload);
    },
    deleteFavorite(context, payload) {
      context.commit("deleteFavorite", payload);
    },
    eraseFavoritePokemonList(context) {
      context.commit("eraseFavoritePokemonList");
    },
    resetPokemonData(context) {
      context.commit("resetPokemonData");
    },

    setUsername(context, username) {
      context.commit("setUsername", username);
    },
    login({ commit }, username) {
      // Perform authentication logic (e.g., check credentials)
      // If authentication is successful, commit the mutation to set authentication
      commit('setAuthentication', username);
    },
    logout({ commit, dispatch }) {
      localStorage.removeItem('favoritePokemonList');
      commit('eraseFavoritePokemonList');
      // Dispatch the action to reset Pokémon data
      dispatch('resetPokemonData');

      commit('clearAuthentication');
    },
  },
  mutations: {
    setPokemonData(state, list) {
      state.statePokemonDataList = list;
    },
    setFavoritePokemonList(state, list) {
      state.stateFavoritePokemonList = list;
      localStorage.setItem('favoritePokemonList', JSON.stringify(state.stateFavoritePokemonList));

    },
    addFavorite(state, name) {
      state.stateFavoritePokemonList.push(name);
      localStorage.setItem('favoritePokemonList', JSON.stringify(state.stateFavoritePokemonList));

    },
    deleteFavorite(state, item) {
      state.stateFavoritePokemonList.splice(item, 1);
      localStorage.setItem('favoritePokemonList', JSON.stringify(state.stateFavoritePokemonList));

    },
    eraseFavoritePokemonList(state) {
      state.stateFavoritePokemonList = [];
      localStorage.setItem('favoritePokemonList', JSON.stringify(state.stateFavoritePokemonList));
    },
    resetPokemonData(state) {
      state.statePokemonDataList = [];
    },
    // New mutation to set the username
    setAuthentication(state, username) {
      state.isAuthenticated = true;
      state.username = username;
    },
    // New mutation to clear the username
    clearAuthentication(state) {
      state.isAuthenticated = false;
      state.username = null;
    },
  },
  getters: {
    // Getter to check if the user is authenticated
    isAuthenticated: (state) => state.isAuthenticated,
  },
});
