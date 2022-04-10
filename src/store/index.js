import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idstatus: 0,
    id: "",
    player:false,
    music:{}
  },
  mutations: {
    details: function(state, payload) {
      console.log(state,payload);
      state.idstatus = payload;
    },

    LIST: function(state, payload) {
      state.id = payload;
    },
    playerstate:function(state, payload){
      state.player=payload[0],
      state.music=payload[1]
    },
  },
  actions: {},
  modules: {},
});
