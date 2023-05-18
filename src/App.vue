<template>
  <div>
    <Icons/>
    <Alert v-if="isShow"/>
    <Transition>
      <SMSconfirmation v-if="isConfirmation"/>
    </Transition>
    <Transition>
      <Konstructor v-if="isKonstructor"/>
    </Transition>
  <Transition>
      <ChangePassword v-if="isChangePassword"/>
  </Transition>
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>
import Icons from '@/components/ui/icons.vue'
import LoginLayout from './layouts/login.vue'
import DefaultLayout from './layouts/deafult.vue'
import UserLayout from './layouts/user.vue'
import SMSconfirmation from '@/components/ui/application/SMSconfirmation/index.vue'
import Alert from '@/components/ui/alert.vue'
import ChangePassword from '@/components/ui/application/changePassword/index.vue'
import {mapState} from 'vuex'
import Konstructor from '@/components/ui/application/konstructor/index.vue'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'login') + '-layout'
    },
    ...mapState({
        isShow: state => state.Alert.alert.isShow,
        isConfirmation: state => state.SMSconfirmation.isConfirmation,
        isChangePassword: state => state.changePassword.isChangePassword,
        isKonstructor: state => state.isKonstructor
    })
  },
  components: {
    LoginLayout, DefaultLayout, UserLayout, Alert, SMSconfirmation, ChangePassword, Icons, Konstructor
  },
}
</script>
<style>
  @import url('./assets/css/fonts.css');
  body {
    font-family: 'Manrope', sans-serif;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
