<template>
<Header title="Профиль абонента"/>
<div v-if="data" class="flex flex-col gap-[30px]">
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        <div class="border py-6 px-4 sm:px-9">
            <div class="mb-6 flex justify-between">
                <GrayText>
                    Номер телефона
                </GrayText>
                <svg fill="none" stroke="#718096" width="24" height="24" class="cursor-pointer"
                @click="logout">
                    <use xlink:href="#logout"/>
                </svg>
            </div>
            <Title class="!text-xl sm:!text-4xl-1">
                +{{abonentNumber}}
            </Title>
        </div>
        <div class="border py-6 px-4 sm:px-9">
            <div class="mb-6 flex justify-between">
                <GrayText>
                    Тарифный план
                </GrayText>
                <svg fill="none" stroke="#A0AEC0" width="20" height="20" class="cursor-pointer">
                    <use xlink:href="#points"/>
                </svg>
            </div>
            <Title class="!text-xl sm:!text-4xl-1">
                {{data.priceplanName}}
            </Title>
        </div>
    </div>
    <div class="w-full flex flex-wrap lg:flex-nowrap gap-[30px]">
        <div class="w-full md:w-1/3 border p-6">
            <div class="flex justify-between">
                <GrayText>
                    Баланс
                </GrayText>
                <svg fill="none" stroke="#A0AEC0" width="20" height="20" class="cursor-pointer">
                    <use xlink:href="#points"/>
                </svg>
            </div>
            <div class="mt-6 mb-4">
                <Title class="inline-block">{{data.balance}}</Title> <span class="text-xl font-extrabold text-Vgray">UZS</span>
            </div>
            <p>
                <GrayText>
                    Обновлено {{data.priceplanActivationDate}}
                </GrayText>
            </p>
        </div>
        <div class="w-full md:w-2/3 border p-6">
            <SubTitle class="mb-6">
                Остатки по пакету
            </SubTitle>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div class="border py-[13px] flex flex-col items-center gap-2" v-for="(item, index) in data.balances" :key="index">
                    <div class="relative w-10 h-10 rounded-full bg-[#FFFAF2]">
                        <svg fill="none" stroke="black" width="20" height="20" class="center">
                            <use :xlink:href="`#${item.trafficType == 1 ? 'internet' : item.trafficType == 3 ? 'phone' : 'sms'}`"/>
                        </svg>
                    </div>
                    <BlackText class="text-center">
                        {{item.balanceValue}}
                    </BlackText>
                    <BlackText class="text-center !text-[12px]">
                        {{item.balanceName}}
                    </BlackText>
                    <BlackText class="text-center !text-[12px]">
                        До: {{item.balanceExpirationDate}}
                    </BlackText>
                </div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        <div class="border flex flex-col gap-6 items-center p-9 cursor-pointer" 
        v-for="link in links" :key="link.id"
        @click="changePage(link)">
            <div class="relative w-14 h-14 rounded-full bg-[#FAFAFA]">
                <svg width="28" height="28" class="center">
                    <use :xlink:href="`#${link.svg}`"/>
                </svg>
            </div>
            <BlackText class="text-center">
                {{link.text}}
            </BlackText>
        </div>
    </div>
</div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Header from '@/components/ui/header.vue'
import GrayText from '@/components/ui/texts/Medium-Vgray-Base.vue'
import BlackText from '@/components/ui/texts/Semibold-Vblack-Base.vue'
import Title from '@/components/ui/texts/ExtraBold-Vblack-4xl1.vue'
import SubTitle from '@/components/ui/texts/ExtraBold-Vblack-Base.vue'
export default {
    name: 'UserDashboardComponent',
    components: {
        Header,
        GrayText,
        Title,
        SubTitle,
        BlackText
    },
    computed: {
        ...mapState({
            data: state => state.data,
            privileges: state => state.privileges,
            alert: state => state.Alert.alert
        }),
        abonentNumber() {
            return window.localStorage.getItem('abonentNumber') 
        }
    },
    data() {
        return {
            links: [
                {
                    id: 1,
                    text: 'Замена номера',
                    svg: 'status-up',
                },
                {
                    id: 2,
                    text: 'Сменить тарифный план',
                    svg: 'status-up',
                    link: '/user-tariffs',
                    privilege: 'changePriceplans:read'
                },
                {
                    id: 3,
                    text: 'Управление услугами',
                    svg: 'wallet',
                    link: '/user-services',
                    privilege: 'operateServices:read',
                },
                {
                    id: 4,
                    text: 'Детализация звонков',
                    svg: 'status-up',
                    link: '/user-details',
                    privilege: 'subscriberInfo:read'
                },
            ]
        }
    },
    methods: {
        ...mapMutations({
            search_number: 'searchNumber/CHANGE_SHOW'
        }),
        ...mapActions({
            get_page: 'get_pagedata'
        }),
        async get_dashboard() {
            let payload = {
                request: `subscriber-info/${this.abonentNumber}`,
                key: 'data',
                body: []
            }
            await this.get_page(payload)
            if(this.alert.type == 'error') {
                this.$router.push('/home')
            }
            let newList = []
            this.links.forEach((link) => {
                this.privileges.forEach((item) => {
                    if(link.privilege == item) {
                        newList.push(link)
                    }
                })
            })
            newList.push(this.links[0])
            this.links = newList
        },
        logout() {
            window.localStorage.removeItem('abonentNumber')
            this.$router.push('/home')
        },
        changePage(field) {
            if(field.link) {
                this.$router.push(field.link)
            } else {
                this.search_number(true)
            }
        }
    },
    mounted() {
        this.get_dashboard()
    }
}
</script>
<style scoped>
.shadow {
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}
.border {
    border: 1px solid #EDF2F7;
    border-radius: 16px;
}
</style>