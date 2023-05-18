<template>
    <div class="border-b border-light-gray px-[6.4px] py-1 flex items-center justify-between">
        <Title>
            Изменить пароль
        </Title>
        <span class="font-bold text-2xl opacity-75 hover:opacity-100 cursor-pointer"
        @click="change_password(false)">
            ×
        </span>
    </div>
</template>
<script>
import Title from '@/components/ui/titles/base-black.vue'
import {mapMutations} from 'vuex'
export default {
    name: 'HeaderChangePasswordApplicationComponent',
    components: {
        Title
    },
    methods: {
        ...mapMutations({
            change_password: 'changePassword/CHANGE_PASSWORD'
        })
    }
}
</script>