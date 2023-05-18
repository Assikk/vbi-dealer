<template>
    <div class="flex justify-center gap-2">
        <div v-for="item in list" :key="item.id" class="p-2.5 rounded-full cursor-pointer"
        :class="$route.path.includes(item.link) ? 'bg-light-yellow' : 'underline'"
        @click="chooseTab(item)">
            {{item.text}}
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    name: 'TabsUser',
    data() {
        return {
            list: [
                {
                    id: 1,
                    text: 'Профиль абонента',
                    link: 'user-dashboard'
                },
                {
                    id: 2,
                    text: 'Тарифы',
                    link: 'user-tariffs'
                },
                {
                    id: 3,
                    text: 'Услуги',
                    link: 'user-services'
                },
                {
                    id: 4,
                    text: 'Замена номера',
                },
                {
                    id: 5,
                    text: 'Детализация',
                    link: 'user-details'
                },
            ]
        }
    },
    methods: {
        ...mapMutations({
            change_search_number: 'searchNumber/CHANGE_SHOW'
        }),
        chooseTab(e) {
            if(e.link) {
                this.$router.push(e.link)
            } else {
                this.change_search_number(true)
            }
        }
    }
}
</script>