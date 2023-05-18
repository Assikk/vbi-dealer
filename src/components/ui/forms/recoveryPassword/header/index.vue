<template>
    <div class="border-b border-light-gray px-[6.4px] py-1 flex items-center justify-between">
        <Title>
            Восстановление пароля
        </Title>
        <Close @click="change_recovery_password(false)"/>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import Title from '@/components/ui/titles/base-black.vue'
import Close from './close.vue'
export default {
    name: 'FormRecoveryPasswordHeaderComponent',
    components: {
        Title, Close
    },
    methods: {
        ...mapMutations({
            change_recovery_password: 'recoveryPassword/CHANGE_RECOVERY_PASSWORD'
        })
    }
}
</script>