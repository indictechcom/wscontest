import Vue from 'vue'
import Vuex from 'vuex'
import backendApi from './../api/backendApi';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "username": "Jayprakash12345"
  },
  mutations: {
    setUserName: (state, payload) => {
      state.username = payload
    }
  },
  actions: {
    getUserDetails: (context) => {
      backendApi.get("/api/profile")
        .then(({ data }) => {
          //if (data.logged) {
            context.commit('setUserName', data.username)
          //}
        })
        .catch(() => alert("Something went wrong with auth."))
    }
  },
  modules: {
  },
  getters: {
    getUserName: state => state.username
  }
})
