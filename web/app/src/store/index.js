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
    },
    clearUserData(state) {
      state.userName = '';
    }
  },
  actions: {
    updateUserName({ commit }, userName) {
      commit('setUserName', userName);
    },
    logout({ commit }) {
      commit('clearUserData')
    }
  },
  getters: {
    getUserName(state) {
      return state.userName;
    }
  }
});
