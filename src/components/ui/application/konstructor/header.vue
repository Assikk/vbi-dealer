<template>
    <div class="p-1.5 flex justify-between items-center border-b-[1px] border-light-gray">
        <Title>
            Твой конструктор!
        </Title>
        <Close @click="closeKonstructor"/>
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
            change_state: 'CHANGE_STATE'
        }),
        closeKonstructor() {
            let payload = {
                key: 'isKonstructor',
                body: false
            }
            this.change_state(payload)
        }
    }
}
</script>