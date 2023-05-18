<template>
    <Transition>
        <SeacrhNumber v-if="isShow"/>
    </Transition>
    <section class="flex w-full h-full">
        <Aside :links="links"
        class="hidden lg:block"/>
        <BurgerMenu :links="links"/>
        <router-view class="p-10 w-full"/>
    </section>
</template>
<script>
import {mapState} from 'vuex'
import Aside from '@/components/ui/aside.vue'
import SeacrhNumber from '@/components/ui/application/searchNumber/index.vue'
import BurgerMenu from '@/components/ui/burger/menu.vue'
// import Tabs from '@/components/domain/user-dashboard/tabs/index.vue'
export default {
    name: 'UserLayout',
    components: {
        // Tabs, 
        Aside,
        SeacrhNumber,
        BurgerMenu
    },
    data() {
        return {
            links: [
                {
                    id: 1,
                    text: 'Профиль абонента',
                    link: '/user-dashboard',
                    privilege: 'subscriberInfo:read'
                },
                {
                    id: 2,
                    text: 'Тарифы',
                    link: '/user-tariffs',
                    privilege: 'changePriceplans:read'
                },
                {
                    id: 3,
                    text: 'Услуги',
                    link: '/user-services',
                    privilege: 'operateServices:read',
                },
                {
                    id: 4,
                    text: 'Замена номера',
                    privilege: 'changeNumbers:read'
                },
                {
                    id: 5,
                    text: 'Детализация',
                    link: '/user-details',
                    privilege: 'subscriberInfo:read'
                },
            ]
        }
    },
    computed: {
        ...mapState({
            isShow: state => state.searchNumber.isShow,
            privileges: state => state.privileges
        })
    },
    methods: {
        filterLinks() {
            let newLinks = []
            this.links.forEach((link) => {
                this.privileges.forEach((item) => {
                    if(link.privilege == item) {
                        newLinks.push(link)
                    }
                })
            })
            this.links = newLinks
        }
    },
    mounted() {
        this.filterLinks()
    }
}
</script>