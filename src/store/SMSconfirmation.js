export default ({
    namespaced: true,
    state: {
        isConfirmation: false
    },
    getters: {
    },
    mutations: {
        CHANGE_CONFIRMATION(state, payload) {
            state.isConfirmation = payload
        }
    },
    actions: {
    },
    modules: {
    }
  })
  