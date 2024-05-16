// store.js
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      userName: ''
    };
  },
  mutations: {
    setUserName(state, userName) {
      state.userName = userName;
      localStorage.setItem('userName', userName);
    }
  },
  actions: {
    updateUserName({ commit }, userName) {
      commit('setUserName', userName);
    },
    retrieveUserName({ commit }) {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        commit('setUserName', storedUserName);
      }
    }
  },
  getters: {
    getUserName(state) {
      return state.userName;
    }
  }
});
