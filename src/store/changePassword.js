export default ({
    namespaced: true,
    state: {
      isChangePassword: false
    },
    getters: {
    },
    mutations: {
      CHANGE_PASSWORD(state, payload) {
          state.isChangePassword = payload
      },
    },
    actions: {
    },
    modules: {
    }
  })
  