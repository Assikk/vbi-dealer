import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      layout: 'login'
    }
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/applications-golden-number',
    name: 'ApplicationsGoldenNumber',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/ApplicationsGoldenNumber.vue')
  },
  {
    path: '/registration-abonent',
    name: 'RegistrationAbonent',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/registraion-abonent/index.vue')
  },
  {
    path: '/registration-abonent/:id/read',
    name: 'RegistrationAbonentRead',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/registraion-abonent/read.vue')
  },
  {
    path: '/installment',
    name: 'Installment',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/installmentView.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/statistics/index.vue')
  },
  {
    path: '/statistics/:id',
    name: 'SingleStatistics',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/statistics/id.vue')
  },
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    meta: {
      layout: 'user'
    },
    component: () => import('../views/User-Dashboard.vue')
  },
  {
    path: '/user-tariffs',
    name: 'UserTariff',
    meta: {
      layout: 'user'
    },
    component: () => import('../views/User-Tariffs.vue')
  },
  {
    path: '/user-services',
    name: 'UserServices',
    meta: {
      layout: 'user'
    },
    component: () => import('../views/User-Services.vue')
  },
  {
    path: '/user-details',
    name: 'UserDetails',
    meta: {
      layout: 'user'
    },
    component: () => import('../views/User-details.vue')
  },
  {
    path: '/recovery-sim',
    name: 'RecoverySim',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/recovery-sim.vue')
  },
  {
    path: '/connecting-services',
    name: 'ConnectingServices',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/connecting-services.vue')
  },
  {
    path: '/changed-number',
    name: 'ChangedNumber',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/changed-number.vue')
  },
  {
    path: '/changed-tariff',
    name: 'ChangedTariff',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/changed-tariff.vue')
  },
  {
    path: '/info-seller',
    name: 'InfoSeller',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/info-seller.vue')
  },
  {
    path: '/registries',
    name: 'Registries',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/registries/index.vue')
  },
  {
    path: '/registries/:id',
    name: 'RegistriesId',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/registries/id.vue')
  },
  {
    path: '/sim-registries',
    name: 'SimRegistries',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/sim-registries.vue')
  },
  {
    path: '/registries/:id/detail',
    name: 'DetailRegistr',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/registries/detail.vue')
  },
  {
    path: '/statistics-sim',
    name: 'StatisticsSim',
    meta: {
      layout: 'default'
    },
    component: () => import('../views/statistics-sim.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
