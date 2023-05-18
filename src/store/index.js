import { createStore } from 'vuex'
import recoveryPassword from './recoveryPassword'
import Alert from './alert'
import searchNumber from './searchNumber'
import SMSconfirmation from './SMSconfirmation'
import changePassword from './changePassword'
import Calendar from './calendar'
import api from '@/api'

let privileges = localStorage.getItem('privileges')
privileges = JSON.parse(privileges)
export default createStore({
  state: {
    privileges: privileges,
    countries: [],
    priceplans: [],
    statistics: [],
    categoriesNumbers: [],
    numbers: [],
    changedPhoneNumber: {
      number: '',
      price: null
    },
    registrationId: null,
    scan: null,
    services: [],
    page: null,
    abonent: {
      phoneNumber: '',
      code: ''
    },
    sms: null,
    isBurger: false,
    data: null,
    diller: null,
    isKonstructor: false,
    konstructorOptions: null,
    activeTariff: {
      price: null,
      priceplan: '',
      technicalPriceplan: ''
    },
    area: [],
    exportFileId: null,
    exportCheck: {},
    exportFile: null
  },
  getters: {
  },
  mutations: {
    CHANGE_STATE(state, payload) {
      state[payload.key] = payload.body
    },
    GET_REGISTRATIONDID(state, payload) {
      state.registrationId = payload
    },
    GET_SCAN(state, payload) {
      state.scan = payload
    },
    GET_FILE(state, payload) {
      state.exportFile = payload
    }
  },
  actions: {
    async get_pagedata({commit}, payload) {
      try {
        let res = await api.get(payload.request, payload.headers)
        payload.body = res.data
        commit('CHANGE_STATE', payload)
      } catch(err) {
        if(err.response.status == 403) {
          let alert = {
            isShow: true,
            msg: 'Отказано в доступе',
            type: 'error'
          }
          commit('Alert/CHANGE_ALERT', alert)
          // setTimeout(() =>{
          //   commit('Alert/CLEAR_ALERT')
          // }, 5000)
        }
        if(err.response.status == 401) {
          window.location.replace('/')
        }
        else {
          let alert = {
            isShow: true,
            msg: err.response.data.message,
            type: 'error'
          }
          commit('Alert/CHANGE_ALERT', alert)
          // commit('Alert/ERROR_ALERT')
          // setTimeout(() =>{
          //   commit('Alert/CLEAR_ALERT')
          // }, 5000)
        }
      }
    },
    async get_file({commit}, payload) {
      try {
        let res = await api.get(payload.request, payload.headers)
        let file = new Blob([res.data], {type: 'application/xlsx'})
        let fileURL = URL.createObjectURL(file)
        commit('GET_FILE', fileURL)
      } catch(err) {
        let alert = {
          isShow: true,
          msg: 'Что то пошло не так :(',
          type: 'error'
        }
        commit('Alert/CHANGE_ALERT', alert)
        console.log(err);
      }
    },
    async post_request({commit}, payload) {
      commit('Alert/LOADED_ALERT', payload)
      try {
        let res = await api.post(payload.request, payload.body, payload.headers)
        let page = {
          body: res.data,
          key: 'page'
        }
        commit('CHANGE_STATE', page)
        if(res.data.success == true) {
          let alert = {
              isShow: true,
              msg: res.data.message,
              type: 'success'
          }
          commit('Alert/CHANGE_ALERT', alert)
          setTimeout(() =>{
            commit('Alert/CLEAR_ALERT')
          }, 2000)
        }
        if(res.data.type == 'application/pdf') {
          let alert = {
              isShow: true,
              msg: 'Успешно..',
              type: 'success'
          }
          commit('Alert/CHANGE_ALERT', alert)
          setTimeout(() =>{
            commit('Alert/CLEAR_ALERT')
          }, 2000)
        }
        if(res.data.success == false) {
          let alert = {
            isShow: true,
            msg: res.data.message,
            type: 'error'
          }
          commit('Alert/CHANGE_ALERT', alert)
        // setTimeout(() =>{
        //   commit('Alert/CLEAR_ALERT')
        // }, 5000)
        } else {
          setTimeout(() =>{
            commit('Alert/CLEAR_ALERT')
          }, 2000)
        }
      }catch(err) {
        if(err.response.status == 401) {
          window.location.replace('/')
        }
        if(err.response.status == 403) {
          let alert = {
            isShow: true,
            msg: 'Отказано в доступе',
            type: 'error'
          }
          commit('Alert/CHANGE_ALERT', alert)
          // setTimeout(() =>{
          //   commit('Alert/CLEAR_ALERT')
          // }, 5000)
        }
        else {
          let alert = {
            isShow: true,
            msg: err.response.data.message,
            type: 'error'
          }
          commit('Alert/CHANGE_ALERT', alert)
          // setTimeout(() =>{
          //   commit('Alert/CLEAR_ALERT')
          // }, 5000)
        }
        
      }
    },
    async post_scan({commit}, payload) {
      commit('Alert/LOADED_ALERT', payload)
      try {
        let res = await api.post(payload.request, payload.body, payload.headers)
        commit('GET_REGISTRATIONDID', res.headers.get('registration-id'))
        let file = new Blob([res.data], {type: 'application/pdf'})
        let fileURL = URL.createObjectURL(file)
        commit('GET_SCAN', fileURL)
          let alert = {
            isShow: true,
            msg: 'Успешно..',
            type: 'success'
          }
          commit('Alert/CHANGE_ALERT', alert)
          setTimeout(() =>{
            commit('Alert/CLEAR_ALERT')
          }, 2000)
      }catch(err) {
        let error = await new Response(err.response.data).text()
        error = JSON.parse(error)
        if(err.response.status == 401) {
          window.location.replace('/')
        }
        if(err.response.status == 403) {
          let alert = {
            isShow: true,
            msg: 'Отказано в доступе',
            type: 'error'
          }
          commit('Alert/CHANGE_ALERT', alert)
          // setTimeout(() =>{
          //   commit('Alert/CLEAR_ALERT')
          // }, 5000)
        }
        else {
          let alert = {
            isShow: true,
            msg: error.message,
            type: 'error'
          }
          commit('Alert/CHANGE_ALERT', alert)
          // setTimeout(() =>{
          //   commit('Alert/CLEAR_ALERT')
          // }, 5000)
        }
      }
    },
    async put_request({commit}, payload) {
      commit('Alert/LOADED_ALERT', payload)
      try {
        let res = await api.put(payload.request, payload.body, payload.headers)
          let page = {
            body: res.data,
            key: 'page'
          }
          commit('CHANGE_STATE', page)
          if(res.data.success == true) {
            let alert = {
                isShow: true,
                msg: res.data.message,
                type: 'success'
            }
            commit('Alert/CHANGE_ALERT', alert)
            setTimeout(() =>{
              commit('Alert/CLEAR_ALERT')
            }, 2000)
          }
          if(res.data.success == false) {
            let alert = {
              isShow: true,
              msg: res.data.message,
              type: 'error'
            }
            commit('Alert/CHANGE_ALERT', alert)
            // setTimeout(() =>{
            //   commit('Alert/CLEAR_ALERT')
            // }, 5000)
          } else {
            let alert = {
              isShow: true,
              msg: 'Успешно',
              type: 'success'
            }
            commit('Alert/CHANGE_ALERT', alert)
            setTimeout(() =>{
              commit('Alert/CLEAR_ALERT')
            }, 2000)
          }
      }catch(err) {
        if(err.response.status == 401) {
          window.location.replace('/')
        }
        if(err.response.status == 403) {
          let alert = {
            isShow: true,
            msg: 'Отказано в доступе',
            type: 'error'
          }
          commit('Alert/CHANGE_ALERT', alert)
          // setTimeout(() =>{
          //   commit('Alert/CLEAR_ALERT')
          // }, 5000)
        }
        else {
          let alert = {
            isShow: true,
            msg: err.response.data.message,
            type: 'error'
          }
          commit('Alert/CHANGE_ALERT', alert)
          // setTimeout(() =>{
          //   commit('Alert/CLEAR_ALERT')
          // }, 5000)
        }
        
      }
    }
  },
  modules: {
    recoveryPassword, Alert, searchNumber, SMSconfirmation, changePassword, Calendar
  }
})
