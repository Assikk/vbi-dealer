<template>
    <section class="flex h-screen w-screen">
        <!-- start pattern -->
        <div class="min-w-[36px] sm:min-w-[75px] bg-[#F7BE00]/50"/>
        <!-- end pattern -->
        <Transition>
            <RecoveryPassword v-if="isRecoveryPassword"/>
        </Transition>
        <Transition>
            <ConfirmationPassword v-if="isConfirmation"/>
        </Transition>
        <router-view class="h-screen w-screen"/>
    </section>
</template>
<script>
import {mapState} from 'vuex'
import RecoveryPassword from '../components/ui/application/recoveryPassword/index.vue'
import ConfirmationPassword from '../components/ui/application/recoveryPassword/confirmation.vue'
export default {
    name: 'LoginLayout',
    components: {
        RecoveryPassword, ConfirmationPassword
    },
    computed: {
        ...mapState({
        isRecoveryPassword: state => state.recoveryPassword.isRecoveryPassword,
        isConfirmation: state => state.recoveryPassword.isConfirmation
        }),
    }
}
</script>