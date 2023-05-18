<template>
    <div class="p-1.5 flex justify-between items-center border-b-[1px] border-light-gray">
        <Title>
            Поиск номеров
        </Title>
        <Close @click="closeSearchNumber"/>
    </div>
</template>
<script>
import Title from '@/components/ui/titles/medium/xl.vue'
import Close from '@/components/ui/icons/close.vue'
import {mapMutations} from 'vuex'
export default {
    name: 'HeaderSearchNumber',
    components: {
        Title, Close
    },
    methods: {
        ...mapMutations({
            change_search_number: 'searchNumber/CHANGE_SHOW',
            change_state: 'CHANGE_STATE'
        }),
        closeSearchNumber() {
            let payload = {
                key: 'changedPhoneNumber',
                body: {
                    number: '',
                    price: null
                }
            }
            this.change_state(payload)
            let numbers = {
                key: 'numbers',
                body: []
            }
            this.change_state(numbers)
            this.change_search_number(false)
            // if(this.$route.path.includes('user')) {
            //     this.$router.push('/home')
            // }
        }
    }
}
</script>