    <template>
    <nav class="fixed w-full h-full top-0 left-0 pointer-events-none z-[999999999]">
        <div class="menu absolute top-0 left-0 w-full h-full"
        :class="isBurger ? 'opacity-100' : 'opacity-0'">
        </div>
        <div class="content relative h-full bg-white"
        :class="isBurger ? 'translate-x-0' : '-translate-x-full'">
            <div class="py-4 border-b-[1px] border-gray">
                <div class="flex justify-between items-center px-4">
                    <div class="w-44 h-full">
                        <img src="@/assets/img/logo.webp" alt="Logo">
                    </div>
                    <div class="flex items-center">
                        <div class="relative bg-[#FAFAFA] rounded-full h-full mr-4">    
                            <svg class="center" width="24" height="24" viewBox="0 0 28 28" stroke="#1A202C" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6667 5.83333C11.6667 5.21449 11.9126 4.621 12.3502 4.18342C12.7878 3.74583 13.3812 3.5 14.0001 3.5C14.6189 3.5 15.2124 3.74583 15.65 4.18342C16.0876 4.621 16.3334 5.21449 16.3334 5.83333C17.6732 6.46687 18.8154 7.45305 19.6375 8.68618C20.4596 9.91932 20.9306 11.3529 21.0001 12.8333V16.3333C21.0879 17.0587 21.3448 17.7532 21.75 18.3611C22.1553 18.9691 22.6977 19.4733 23.3334 19.8333H4.66675C5.30251 19.4733 5.84486 18.9691 6.25013 18.3611C6.65541 17.7532 6.91228 17.0587 7.00008 16.3333V12.8333C7.06957 11.3529 7.5406 9.91932 8.36269 8.68618C9.18478 7.45305 10.3269 6.46687 11.6667 5.83333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.5 19.8334V21C10.5 21.9283 10.8687 22.8185 11.5251 23.4749C12.1815 24.1313 13.0717 24.5 14 24.5C14.9283 24.5 15.8185 24.1313 16.4749 23.4749C17.1313 22.8185 17.5 21.9283 17.5 21V19.8334" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg class="absolute top-1/2 left-1/2 transform -translate-x-[10%] -translate-y-[90%]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7" cy="7" r="5.75" fill="#FF4747" stroke="#F2F6FF" stroke-width="1.5"/>
                            </svg>
                        </div>
                        <svg viewBox="0 0 24 24" class="fill-black w-8 h-8 ml-auto"
                        @click="closeBurger">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 101.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 00-1.414-1.414L12 10.586 6.707 5.293z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4 mt-2 px-4">
                <div class="flex">
                    <input type="text" class="w-full border-y-[1px] border-l-[1px] outline-0 p-2 rounded-l-xl border-[#E2E8F0]"
                    placeholder="Поиск...">
                    <div class="relative w-12 border-[1px] border-[#E2E8F0] bg-[#E2E8F0] rounded-r-xl">
                        <svg class="center" width="24" height="24" viewBox="0 0 24 24" stroke="#fff" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.7666" cy="11.7666" r="8.98856" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.0183 18.4852L21.5423 22.0001" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div v-for="link in links" :key="link.id"
                @click="clickLink(link)">
                    <div class="flex items-center gap-4">
                        <p class="text-lg w-[220px]">
                            {{link.text}}
                        </p>
                        <img v-if="link.child" src="@/assets/img/arrow.svg" alt="" class="min-w-5 min-h-5"
                        :class="link.isActive ? 'rotate-180' : ''">
                    </div>
                    <ul v-if="link.isActive">
                        <li v-for="item in link.child" :key="item.id" class="px-5 py-[10px]"
                        :class="item.link == $route.path ? 'bg-dim-yellow' : 'hover:bg-dim-yellow'">
                            <p @click="clickChildLink(item)">
                                {{item.text}}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    name: 'BurgerMenuComponent',
    props: {
        links: {
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapState({
            isBurger: state => state.isBurger
        })
    },
    data() {
        return {
            // links: [
            //     {
            //         id: 1,
            //         text: 'Продавец',
            //         link: '/info-seller'
            //     },
            //     {
            //         id: 2,
            //         text: 'Регистрация абонента',
            //         link: '/registration-abonent'
            //     },
            //     {
            //         id: 3,
            //         text: 'Абонентские операции',
            //         isActive: false,
            //         child: [
            //             {
            //                 id: 1,
            //                 text: 'Профиль абонента',
            //                 link: '/home'
            //             }
            //         ]
            //     },
            //     {
            //         id: 4,
            //         text: 'Заявки Golden number',
            //         link: '/applications-golden-number'
            //     },
            //     {
            //         id: 5,
            //         text: 'Электронные реестры',
            //         link: '/registries'
            //     },
            //     {
            //         id: 6,
            //         text: 'Статистика',
            //         isActive: false,
            //         child: [
            //             {
            //                 id: 1,
            //                 text: 'Подключение услуг',
            //                 link: '/connecting-services'
            //             },
            //             {
            //                 id: 2,
            //                 text: 'Замена номера',
            //                 link: '/changed-number'
            //             },
            //             {
            //                 id: 3,
            //                 text: 'Смена тарифа',
            //                 link: '/changed-tariff'
            //             },
            //         ]
            //     },
            // ]
        }
    },
    methods: {
        ...mapMutations({
            change_state: 'CHANGE_STATE',
            change_search_number: 'searchNumber/CHANGE_SHOW'
        }),
        closeBurger() {
            let payload = {
                key: 'isBurger',
                body: false
            }
            this.change_state(payload)
        },
        clickLink(e) {
            if(e.link) {
                // this.closeBurger()
                location.href = e.link
                // this.$router.push(e.link)
            } else if(e.text == 'Замена номера') {
                this.change_search_number(true)
            } else {
                e.isActive = !e.isActive
            }
        },
        clickChildLink(e) {
            this.closeBurger()
            this.$router.push(e.link)
        }
    }
}
</script>
<style scoped>
    .menu {
        transition: opacity .50s ease-in;
        background: rgba(51,51,51,.48);
    }
    .content {
        pointer-events: all;
        transition: transform .50s ease-in,left .50s ease-in;
        width: calc(100% - 10%);
    }
</style>