import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userModule from '@/storeModules/userModule.js'
import eventModule from '@/storeModules/eventModule.js'
import chatModule from '@/storeModules/chatModule.js'

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    userModule,
    eventModule,
    chatModule
  }
})
