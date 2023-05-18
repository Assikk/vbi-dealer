<template>
    <SeacrhNumber v-if="isShow"/>
    <section class="flex w-full h-full">
        <Aside :links="links"
        class="hidden lg:block"/>
        <BurgerMenu :links="links"/>
        <router-view class="p-4 lg:p-10 w-full"/>
    </section>
</template>
<script>
import Aside from '@/components/ui/aside.vue'
import SeacrhNumber from '@/components/ui/application/searchNumber/index.vue'
import BurgerMenu from '@/components/ui/burger/menu.vue'
import {mapState} from 'vuex'
export default {
    name: 'DefaultLayout',
    components: {
        Aside, 
        SeacrhNumber,
        BurgerMenu
    },
    data() {
        return {
            links: [
                {
                    id: 1,
                    text: 'Главная',
                    link: '/main',
                    svg: 'main'
                },
                {
                    id: 2,
                    text: 'Продавец',
                    link: '/info-seller',
                    svg: 'user',
                    privilege: 'sellerInfo:read'
                },
                {
                    id: 3,
                    text: 'Регистрация',
                    link: '/registration-abonent',
                    svg: 'clipboard',
                    privilege: 'registrations:read'
                },
                {
                    id: 4,
                    text: 'Рассрочка',
                    link: '/installment',
                    svg: 'receipt',
                    privilege: 'partialPayment:read'
                },
                {
                    id: 4,
                    text: 'Восст. SIM',
                    link: '/recovery-sim',
                    svg: 'sim',
                    privilege: 'changeSims:read'
                },
                {
                    id: 5,
                    text: 'Профиль',
                    link: '/home',
                    privilege: 'subscriberInfo:read',
                    svg: 'operations',
                },
                // {
                //     id: 5,
                //     text: 'Операции',
                //     isActive: false,
                //     svg: 'operations',
                //     child: [
                //         {
                //             id: 1,
                //             text: 'Профиль абонента',
                //             link: '/home',
                //             privilege: 'subscriberInfo:read'
                //         }
                //     ]
                // },
                {
                    id: 6,
                    text: 'Golden number',
                    link: '/applications-golden-number',
                    svg: 'phone',
                    privilege: 'goldenNumbers:read',
                },
                {
                    id: 7,
                    text: 'Реестры',
                    link: '/registries',
                    svg: 'registries',
                    privilege: 'registries:read'
                },
                {
                    id: 8,
                    text: 'Статистика',
                    isActive: false,
                    svg: 'card',
                    child: [
                        {
                            id: 1,
                            text: 'Подключение услуг',
                            link: '/connecting-services',
                            privilege: 'operateServices:read',
                        },
                        {
                            id: 2,
                            text: 'Замена номера',
                            link: '/changed-number',
                            privilege: 'changeNumbers:read'
                        },
                        {
                            id: 3,
                            text: 'Смена тарифа',
                            link: '/changed-tariff',
                            privilege: 'changePriceplans:read'
                        },
                        {
                            id: 4,
                            text: 'Восстановление Sim',
                            link: '/statistics-sim',
                            privilege: 'changeSims:read'
                        },
                        {
                            id: 5,
                            text: 'Регистрации',
                            link: '/statistics',
                            privilege: 'registrations:read'
                        },
                    ]
                },
            ],
        }
    },
    computed: {
        ...mapState({
            isShow: state => state.searchNumber.isShow,
            isConfirmation: state => state.SMSconfirmation.isConfirmation,
            privileges: state => state.privileges
        }),
    },
    methods: {
        filterLinks() {
            let newLinks = []
            this.links.forEach((link) => {
                if(link.child) {
                    let newChild = Object.assign({}, link)
                    newChild.child = []
                    link.child.forEach((child) => {
                        this.privileges.forEach((pre) => {
                            if(child.privilege == pre) {
                                newChild.child.push(child)
                            }
                        })
                    })
                    if(newChild.child.length > 0) {
                        newLinks.push(newChild)
                    }
                }
                this.privileges.forEach((item) => {
                    if(link.privilege == item) {
                        newLinks.push(link)
                    }
                })
            })
            this.links.forEach((link) => {
                if(link.text == 'Главная') {
                    newLinks.unshift(link)
                }
            })
            this.links = newLinks
        }
    },
    mounted() {
        this.filterLinks()
    }
}
</script>