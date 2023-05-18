<template>
    <header class="pb-10 flex items-center justify-between">
        <div class="flex items-center gap-4">
            <BurgerMenu class="block lg:hidden"
            @click="showBurgerMenu"/>
            <div class="hidden sm:flex items-center gap-4">
                <router-link v-if="link" :to="link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="#1A202C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 12L9 16" stroke="#1A202C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 12L9 8" stroke="#1A202C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </router-link>
                <Title>
                    {{title}}
                </Title>
            </div>
        </div>
        <div class="relative">
            <div class="flex items-center gap-4 h-12">
                <div class="flex gap-2 items-center font-extrabold text-Vblack">
                    <p class="hidden md:block">
                        Сессия истекает через:
                    </p>
                    <Counter
                    v-if="isTimer"
                    :hours="hours"
                    :minuts="min"
                    :seconds="sec"/>
                </div>
                <div class="hidden sm:block relative w-12 bg-[#FAFAFA] rounded-full h-full">
                    <svg class="center" width="24" height="24" viewBox="0 0 24 24" stroke="#1A202C" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11.7666" cy="11.7666" r="8.98856" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.0183 18.4852L21.5423 22.0001" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="hidden sm:block relative w-12 bg-[#FAFAFA] rounded-full h-full">    
                    <svg class="center" width="28" height="28" viewBox="0 0 28 28" stroke="#1A202C" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6667 5.83333C11.6667 5.21449 11.9126 4.621 12.3502 4.18342C12.7878 3.74583 13.3812 3.5 14.0001 3.5C14.6189 3.5 15.2124 3.74583 15.65 4.18342C16.0876 4.621 16.3334 5.21449 16.3334 5.83333C17.6732 6.46687 18.8154 7.45305 19.6375 8.68618C20.4596 9.91932 20.9306 11.3529 21.0001 12.8333V16.3333C21.0879 17.0587 21.3448 17.7532 21.75 18.3611C22.1553 18.9691 22.6977 19.4733 23.3334 19.8333H4.66675C5.30251 19.4733 5.84486 18.9691 6.25013 18.3611C6.65541 17.7532 6.91228 17.0587 7.00008 16.3333V12.8333C7.06957 11.3529 7.5406 9.91932 8.36269 8.68618C9.18478 7.45305 10.3269 6.46687 11.6667 5.83333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.5 19.8334V21C10.5 21.9283 10.8687 22.8185 11.5251 23.4749C12.1815 24.1313 13.0717 24.5 14 24.5C14.9283 24.5 15.8185 24.1313 16.4749 23.4749C17.1313 22.8185 17.5 21.9283 17.5 21V19.8334" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg class="absolute top-1/2 left-1/2 transform -translate-x-[10%] -translate-y-[90%]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="7" r="5.75" fill="#FF4747" stroke="#F2F6FF" stroke-width="1.5"/>
                    </svg>
                </div>
                <div class="bg-[#FAFAFA] rounded-full p-2 flex items-center gap-[18px] cursor-pointer"
                @click="isShow = !isShow">
                    <div class="flex items-center gap-3">   
                        <div class="relative w-8 h-8 bg-white rounded-full shadow">
                            <svg fill="#1A202C" stroke="#1A202C" width="20" height="20" class="center">
                                <use xlink:href="#admin"/>
                            </svg>
                        </div>
                        <Text>
                            {{user}}
                        </Text>
                    </div>
                    <svg fill="none" stroke="#718096" width="16" height="16"
                    :class="isShow ? 'rotate-180' : ''">
                        <use xlink:href="#arrowDown"/>
                    </svg>
                </div>
            </div>
            <Transition>
                <div v-if="isShow" class="absolute bottom-3/5 -left-6 sm:left-0 w-max sm:w-full bg-white py-2 shadow-lg flex flex-col gap-2">
                    <p class="cursor-pointer hover:bg-gray px-4 py-1"
                    @click="changePassword">
                        Изменить пароль
                    </p>
                    <p class="cursor-pointer px-4 py-1 hover:bg-gray"
                    @click="logout">
                        Выход
                    </p>
                </div>
            </Transition>
        </div>
    </header>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Title from '@/components/ui/texts/ExtraBold-Vblack-2xl.vue'
import Text from '@/components/ui/texts/ExtraBold-Vblack-Base.vue'
import BurgerMenu from '@/components/ui/burger/Icon.vue'
import Counter from '@/components/ui/counter.vue'
import moment from 'moment'
export default {
    name: 'HeaderComponent',
    components: {
        Title, Text,
        BurgerMenu,
        Counter
    },
    data() {
        return {
            isShow: false,
            hours: '00',
            min: '00',
            sec: '00',
            isTimer: false
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String
        }
    },
    computed: {
        ...mapState({
            diller: state => state.diller
        }),
        user() {
            return localStorage.getItem('user')
        },
    },
    methods: {
        ...mapMutations({
            change_password: 'changePassword/CHANGE_PASSWORD',
            change_state: 'CHANGE_STATE'
        }),
        ...mapActions({
            get_request: 'get_pagedata'
        }),
        logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('tokenTime')
            this.$router.push('/')
        },
        changePassword() {
            this.isShow = false
            this.change_password(true)
        },
        showBurgerMenu() {
            let payload = {
                key: 'isBurger',
                body: true
            }
            this.change_state(payload)
        },
        formatTokenTime() {
            let tokenTime = moment(localStorage.getItem('tokenTime')).add(2, 'hours')
            let now = new Date()
            let diffTime = Math.abs(now.valueOf() - new Date(tokenTime));
            this.hours = diffTime/(60*60*1000);
            this.min = (this.hours % 1) * 60;
            this.sec = (this.min % 1) * 60;
            [this.hours, this.min, this.sec] = [Math.floor(this.hours), Math.floor(this.min), Math.floor(this.sec)]
            this.hours = String(this.hours)
            this.min = String(this.min)
            this.sec = String(this.sec)
            this.hours = this.hours.padStart(2, '0')
            this.min = this.min.padStart(2, '0')
            this.sec = this.sec.padStart(2, '0')
            this.isTimer = true
        }
    },
    mounted() {
        this.formatTokenTime()
    }
}
</script>