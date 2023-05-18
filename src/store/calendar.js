export default ({
    namespaced: true,
    state: {
        isCalendar: false,
    },
    getters: {
    },
    mutations: {
      CHANGE_CALENDAR(state, payload) {
        state.isCalendar = payload
      },
    },
    actions: {
    },
    modules: {
    }
  })
  