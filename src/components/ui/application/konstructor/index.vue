<template>
    <div v-if="page" class="w-screen h-screen fixed z-[9999] bg-black/40">
        <div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3/5">
            <div class="bg-white rounded p-4 overflow-y-scroll h-[500px]">
                <Header/>
                <div class="mt-4">
                    <div class="flex justify-between gap-4 mb-[26px]">
                        <div class="w-2/5 flex items-center gap-2">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13" cy="13" r="13" fill="#FFC800"></circle>
                                <circle cx="13.0265" cy="13.027" r="7.21253" stroke="black"></circle>
                                <path d="M5.39076 6.95406L5.31553 6.91711C6.00993 6.01437 6.8739 5.25571 7.85885 4.68381L7.88577 4.76037C6.91215 5.31223 6.06272 6.05906 5.39076 6.95406Z" stroke="black"></path>
                                <path d="M20.6145 6.96102L20.7297 6.90731C20.0313 6.00206 19.1622 5.24217 18.1715 4.67086L18.1315 4.7702C19.1004 5.32251 19.9457 6.06823 20.6145 6.96102Z" stroke="black"></path>
                                <path d="M10.7124 12.2552L12.6405 14.1833L16.8824 9.94141" stroke="black"></path>
                                <path d="M9.16992 19.1973L10.1734 19.9676L9 22L7.99649 21.2297L9.16992 19.1973Z" fill="black"></path>
                                <path d="M16.3266 19.9676L17.4472 19.197L18.6207 21.2295L17.5 22L16.3266 19.9676Z" fill="black"></path>
                            </svg>
                            <p class="text-lg font-bold">
                                Минуты и SMS
                            </p>
                        </div>
                        <div class="w-3/5 grid grid-cols-2 gap-2.5">
                            <PrimaryButton v-for="(button, index) in page.minutesAndSms" :key="index"
                            :active="active.min == button.min || active.sms == button.sms"
                            @click="changeMinAndSms(button)">
                                {{button.name}}
                            </PrimaryButton>
                        </div>
                    </div>
                    <div class="flex justify-between gap-4 mb-[26px]">
                        <div class="w-2/5 flex items-center gap-2">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13" cy="13" r="13" fill="#FFC800"></circle>
                                <circle cx="13" cy="13" r="7.5" stroke="black"></circle>
                                <path d="M12.8205 6V20M6 13H20M6.71795 9.31579V9.31579C10.7287 10.2843 14.9123 10.2843 18.9231 9.31579V9.31579M6.71795 16.6842V16.6842C10.7287 15.7157 14.9123 15.7157 18.9231 16.6842V16.6842" stroke="black"></path>
                                <path d="M16.5 13C16.5 15.1483 16.0635 17.0686 15.3812 18.4332C14.6839 19.8278 13.8132 20.5 13 20.5C12.1868 20.5 11.3161 19.8278 10.6188 18.4332C9.93646 17.0686 9.5 15.1483 9.5 13C9.5 10.8517 9.93646 8.93141 10.6188 7.56675C11.3161 6.17219 12.1868 5.5 13 5.5C13.8132 5.5 14.6839 6.17219 15.3812 7.56675C16.0635 8.93141 16.5 10.8517 16.5 13Z" stroke="black"></path>
                            </svg>
                            <p class="text-lg font-bold">
                                Интернет
                            </p>
                        </div>
                        <div class="w-3/5 grid grid-cols-3 gap-2.5">
                            <PrimaryButton v-for="(button, index) in page.internet" :key="index"
                            :active="active.internet == button.gigabyte"
                            @click="active.internet = button.gigabyte">
                                {{button.name}}
                            </PrimaryButton>
                        </div>
                    </div>
                    <div class="flex justify-between items-start gap-4 mb-[26px]">
                        <div class="w-2/5 flex items-center gap-2">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13" cy="13" r="13" fill="#FFC800"></circle>
                                <path d="M2 14.5981L2.31585 14.3876C2.76494 14.0882 3.37057 14.1992 3.68429 14.6384L6.25952 18.2437C6.58788 18.7034 6.47053 19.3436 6.00049 19.657L5.73832 19.8318M13.5888 8.61682L15.1247 10.1527C15.5152 10.5432 16.1484 10.5432 16.5389 10.1527L20.6916 6" stroke="black"></path>
                                <path d="M3.86914 14.2242L6.80052 12.1723C7.31177 11.8144 7.95568 11.7024 8.55775 11.8666L14.3605 13.4492C15.1781 13.6721 15.6674 14.5077 15.4619 15.3298V15.3298C15.2532 16.1645 14.4075 16.6719 13.5729 16.4633L10.5981 15.7196M16.9533 14.2242L19.5318 12.6771C20.17 12.2942 20.9981 12.5067 21.3731 13.1495V13.1495C21.7263 13.7551 21.5514 14.5306 20.9725 14.9259L15.4489 18.6981C14.7413 19.1814 13.8608 19.339 13.0295 19.1311L7.60746 17.7756L6.48596 18.7102" stroke="black"></path>
                            </svg>
                            <p class="text-lg font-bold">
                                Дополнительные услуги
                            </p>
                        </div>
                        <div class="w-3/5">
                            <div class="flex justify-between items-center gap-2.5 py-3 border-b-[1px] border-[#C4C4C4] cursor-pointer"
                            v-for="(item, index) in page.options" :key="index"
                            @click="changeCheckbox(item)">
                                <p class="text-[#272727] text-[15px]">
                                    {{item.name}} <br> <span class="text-xs text-[#AAAAAA]">{{item.description}}</span>
                                </p>
                                <!-- <div> -->
                                    <!-- <input type="checkbox" :checked="item.key == 'tvMusic' ? true : false"
                                    @change="changeCheckbox(item)"> -->
                                    
                                <!-- </div> -->
                                <span class="checkbox" :class="item.isActive ? 'active' : ''"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <DarkButton @click="learnPrice">
                            Узнать цену
                        </DarkButton>
                        <div class="flex items-center gap-1 cursor-pointer">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-inside-1_4_59" fill="white">
                                <path d="M1.87499 7C1.87499 8.38447 2.28553 9.73785 3.0547 10.889C3.82387 12.0401 4.91712 12.9373 6.19621 13.4672C7.47529 13.997 8.88276 14.1356 10.2406 13.8655C11.5985 13.5954 12.8458 12.9287 13.8247 11.9497C14.8037 10.9708 15.4704 9.7235 15.7405 8.36563C16.0106 7.00777 15.872 5.6003 15.3421 4.32122C14.8123 3.04213 13.9151 1.94888 12.764 1.17971C11.6128 0.410543 10.2595 1.04525e-07 8.87499 0V0.898744C10.0817 0.898744 11.2613 1.25658 12.2647 1.92699C13.268 2.59741 14.05 3.55029 14.5118 4.66515C14.9736 5.78001 15.0944 7.00677 14.859 8.1903C14.6236 9.37382 14.0425 10.461 13.1892 11.3142C12.336 12.1675 11.2488 12.7486 10.0653 12.984C8.88176 13.2194 7.655 13.0986 6.54014 12.6368C5.42528 12.175 4.4724 11.393 3.80198 10.3897C3.13157 9.38633 2.77374 8.20671 2.77374 7H1.87499Z"></path>
                                </mask>
                                <path d="M1.87499 7C1.87499 8.38447 2.28553 9.73785 3.0547 10.889C3.82387 12.0401 4.91712 12.9373 6.19621 13.4672C7.47529 13.997 8.88276 14.1356 10.2406 13.8655C11.5985 13.5954 12.8458 12.9287 13.8247 11.9497C14.8037 10.9708 15.4704 9.7235 15.7405 8.36563C16.0106 7.00777 15.872 5.6003 15.3421 4.32122C14.8123 3.04213 13.9151 1.94888 12.764 1.17971C11.6128 0.410543 10.2595 1.04525e-07 8.87499 0V0.898744C10.0817 0.898744 11.2613 1.25658 12.2647 1.92699C13.268 2.59741 14.05 3.55029 14.5118 4.66515C14.9736 5.78001 15.0944 7.00677 14.859 8.1903C14.6236 9.37382 14.0425 10.461 13.1892 11.3142C12.336 12.1675 11.2488 12.7486 10.0653 12.984C8.88176 13.2194 7.655 13.0986 6.54014 12.6368C5.42528 12.175 4.4724 11.393 3.80198 10.3897C3.13157 9.38633 2.77374 8.20671 2.77374 7H1.87499Z" stroke="black" stroke-width="2" mask="url(#path-1-inside-1_4_59)"></path>
                                <path d="M0.999997 8.88876L2.3193 6.125L3.93435 8.83512" stroke="black"></path>
                            </svg>
                            <p class="text-[15px] border-b-[1px] border-dashed" @click="get_options">
                                Сбросить параметры
                            </p>
                        </div>
                    </div>
                    <div v-if="isShowPrice" class="mt-4 bg-[#FFC800] w-3/5 p-4 rounded-lg shadow text-[#272727] text-[15px]">
                        <div class="pb-4 border-b-[1px] flex flex-col gap-2.5">
                            <div class="flex justify-between">
                                <p>
                                    Абонентская плата:
                                </p>
                                <p>
                                    {{price.price}} сум/мес.
                                </p>
                            </div>
                            <div class="flex justify-between">
                                <p>
                                    Скидка:
                                </p>
                                <p>
                                    {{price.discountPercent}} %
                                </p>
                            </div>
                        </div>
                        <div class="my-4 flex justify-between font-bold">
                            <p>
                                Итоговая сумма
                            </p>
                            <p>
                                {{price.priceWithDiscount}} сум/мес.
                            </p>
                        </div>
                        <DarkButton @click="selectTariff">
                            Выбрать
                        </DarkButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from './header.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
import PrimaryButton from './buttons/primary.vue'
import DarkButton from './buttons/dark.vue'
export default {
    name: 'KonstructorApplication',
    components: {
        PrimaryButton,
        DarkButton,
        Header
    },
    computed: {
        ...mapState({
            page: state => state.konstructorOptions,
            alert: state => state.page
        }),
    },
    data() {
        return {
            active: {},
            payment: 25000,
            discount: 0,
            isShowPrice: false,
            price: {}
        }
    },
    methods: {
        ...mapMutations({
            change_state: 'CHANGE_STATE'
        }),
        ...mapActions({
            get_page: 'get_pagedata',
            post_request: 'post_request'
        }),
        async get_options() {
            let payload = {
                request: 'constructor-priceplans/options',
                key: 'konstructorOptions',
                body: []
            }
            await this.get_page(payload)
            this.page.options.forEach((item) => {
                if(item.key == 'tvMusic') {
                    item.isActive = true
                } else item.isActive = false
            })
            console.log(this.page.options);
            this.active = {
                min: this.page.minutesAndSms[0].min,
                sms: this.page.minutesAndSms[0].sms,
                internet: this.page.internet[0].gigabyte
            }
            this.changeActive()
        },
        changeActive() {
            let newActive = {}
            this.page.options.forEach((item) => {
                newActive[item.key] = false
            })
            for(let key in newActive) {
                if(key == 'tvMusic') {
                    newActive.tvMusic = true
                }
            }
            this.active = {...this.active, ...newActive}
        },
        changeMinAndSms(val) {
            this.active.min = val.min
            this.active.sms = val.sms
        },
        changeCheckbox(x) {
            if(x.key !== 'tvMusic') {
                x.isActive = !x.isActive
                for(let key in this.active) {
                    if(key == x.key) {
                        this.active[key] = !this.active[key]
                    }
                }
            }
        },
        async learnPrice() {
            let payload = {
                request: '/constructor-priceplans/price',
                body: this.active
            }
            await this.post_request(payload)
            if(this.alert !== null) {
                this.isShowPrice = true
                this.price = this.alert
            }
        },
        selectTariff() {
            let activeTariff = {
                key: 'activeTariff',
                body: {
                    price: null,
                    priceplan: this.alert.name,
                    technicalPriceplan: this.alert.ensembleName
                }
            }
            this.change_state(activeTariff)
            let payload = {
                key: 'isKonstructor',
                body: false
            }
            this.change_state(payload)
        }
    },
    mounted() {
        this.get_options()
    },
}
</script>
<style scoped>
.shadow {
    box-shadow: 15px 0px 45px rgb(0 0 0 / 15%);
}
.checkbox {
    min-width: 21px;
    width: 21px;
    height: 21px;
    border: 2.5px solid rgba(255, 200, 0);
    border-radius: 2px;
    transition: border 200ms ease 0s;
}
.active {
    background-image: url('@/assets/img/download.svg');
    background-position: 0.5px 1px;
    background-repeat: no-repeat;
}
</style>