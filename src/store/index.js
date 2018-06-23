import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = {
  state:{

    gameAssetsInit:0,
    monsterSex:0
  },
  mutations:{
    setGameAssetsInit(state,payload){
      state.gameAssetsInit = payload;
    },
    setMonsterSex(state,payload){
      state.monsterSex = payload;
    }
  },
  actions:{
    SET_GAMEASSETSINIT({commit},payload){
      commit('setGameAssetsInit',payload);
    },
    SET_MONSTERSEX({commit},payload){
      commit('setMonsterSex',payload);
    }
  }


}
export default new Vuex.Store(store);
