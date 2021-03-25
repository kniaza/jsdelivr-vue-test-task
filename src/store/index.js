import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import packages from './modules/packages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { packages },
})
