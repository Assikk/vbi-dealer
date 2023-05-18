export default ({
  namespaced: true,
  state: {
    isRecoveryPassword: false,
    isConfirmation: false,
  },
  getters: {
  },
  mutations: {
    CHANGE_RECOVERY_PASSWORD(state, payload) {
        state.isRecoveryPassword = payload
    },
    CONFIRMATION_RECOVERY_PASSWORD(state, payload) {
      state.isConfirmation = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
