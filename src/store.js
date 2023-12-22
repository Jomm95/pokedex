import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      statePokemonDataList: [],
      stateFavoritePokemonList: JSON.parse(localStorage.getItem('favoritePokemonList')) || [],
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
    }
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
    }
  }
});
