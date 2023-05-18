export default ({
    namespaced: true,
    state: {
        alert: {
            isShow: false,
            msg: '',
            type: ''
        }
    },
    getters: {
    },
    mutations: {
      CLEAR_ALERT(state) {
        state.alert.isShow = false
        // state.alert.msg = '',
        // state.alert.type = ''
      },
      CHANGE_ALERT(state, payload) {
        state.alert = payload
      },
      LOADED_ALERT(state) {
        state.alert.isShow = true
        state.alert.msg = 'Идет загрузка, подождите...',
        state.alert.type = 'loaded'
      },
      SUCCESS_ALERT(state) {
        state.alert.isShow = true
        state.alert.msg = 'Ваша операция прошла успешно!',
        state.alert.type = 'success'
      },
      ERROR_ALERT(state) {
        state.alert.isShow = true
        state.alert.msg = 'Ошибка...',
        state.alert.type = 'error'
      }
    },
    actions: {
    },
    modules: {
    }
  })
  