<template>
    <div class="fixed bottom-9 z-[9999999] left-1/2 transform -translate-x-1/2 w-max max-w-[90%] p-4 rounded text-white transition duration-150"
    :class="alertClass">
    <div class="flex items-center gap-4">
        <svg class="min-w-[24px] w-6 min-h-[24px] h-6 fill-white" v-if="alert.type == 'success'">
            <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
        </svg>
        <svg class="min-w-[24px] w-6 min-h-[24px] h-6 fill-white" v-else>
            <path d="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7"/>
        </svg>
        <p>{{alert.msg}}</p>
    </div>
        <p v-if="alert.type == 'error'" class="w-fit mx-auto cursor-pointer shadow-lg text-center mt-2 px-4 py-2 bg-white rounded text-[#ff5252] font-bold"
        @click="clear_alert">
            Закрыть
        </p>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    name: 'AlertComponent',
    computed: {
        ...mapState({
            alert: state => state.Alert.alert
        }),
        alertClass() {
            if(this.alert.type == 'error') {
                return 'bg-[#ff5252]'
            }
            if(this.alert.type == 'success') {
                return 'bg-[#4caf50]'
            }
            if(this.alert.type == 'loaded') {
                return 'bg-[#2196f3]'
            }
            if(this.alert.isShow) {
                // return 'opacity-100'
                return '1'
            } else {
                // return 'opacity-0'
                return '2'
            }
        }
    },
    methods: {
        ...mapMutations({
            clear_alert: 'Alert/CLEAR_ALERT'
        })
    }
}
</script>