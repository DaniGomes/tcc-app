import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    logado: false,
    tipo_user: 'coord', // coord, aluno, orien, admin
    id_user: 0
  },
  mutations: {
    setTipoUser (state, tipo) {
      state.tipo_user = tipo
    },
    setIdUser (state, id) {
      state.id_user = id
    },
    login (state) {
      state.logado = true;
    },
    logout (state) {
      state.logado = false;
    }
  }
})

export default store;