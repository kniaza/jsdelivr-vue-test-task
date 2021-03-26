import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import packages from './modules/packages'
import dialogs from './modules/dialogs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { packages, dialogs },
})
