<template>
    <div>
        <div class="border-b-[1px] border-gray">
            <div class="p-4">
                <div class="flex flex-col md:flex-row items-center justify-center gap-5">
                    <div v-for="item in list" :key="item.id" 
                    class="flex flex-col w-48 border-2 shadow p-2.5 text-center cursor-pointer rounded"
                    :class="activeList == item.id ? 'border-light-yellow' : 'border-gray hover:border-light-yellow'"
                    @click="changeActiveList(item)">
                        <img :src="item.img.src" class="w-[90px] h-[90px] mx-auto" :alt="item.img.alt">
                        <p>
                            {{item.title}}
                        </p>
                    </div>
                </div>
                <p class="pt-[30px] pb-[25px] text-center">
                    {{title}}
                </p>
                <div class="flex items-center justify-center gap-4">
                    <div v-if="activeList == 2" class="flex items-center gap-2">
                        <Input 
                        class="w-24" 
                        id="number" 
                        maxlength="6"
                        v-model="number"
                        @update:modelValue="filterNumber"/>
                    </div>
                    <!-- <Mask v-if="activeList == 3"/> -->
                    <div v-if="activeList == 5" class="flex items-center gap-2">
                        <p>
                            +998 9
                        </p>
                        <Single
                        v-model="mask.zero"/>
                        <p>-</p>
                        <Single
                        v-model="mask.first"/>
                        <Single v-model="mask.second"/>
                        <Single v-model="mask.third"/>
                        <p>-</p>
                        <Single v-model="mask.four"/>
                        <Single v-model="mask.five"/>
                        <p>-</p>
                        <Single v-model="mask.six"/>
                        <Single v-model="mask.seven"/>
                    </div>
                    <Input v-if="activeList == 3"
                    class="w-[120px]" 
                    id="dateNumber"
                    v-model="someNumbers"
                    @update:modelValue="filtersomeNumbers"/>
                    <input type="date" v-if="activeList == 4"
                    class="px-[10px] h-[44px] border-2 border-gray outline-light-yellow"
                    v-model="dateNumber">
                    <ButtonRounded @click="searchNumber"
                    :isDisable="statusButton.isDisabled">
                        Подобрать
                    </ButtonRounded>
                </div>
                <div v-if="activeCategories !== null">
                    <div class="flex flex-wrap items-center justify-center gap-4 mt-8">
                        <ButtonRounded v-for="item in categories" :key="item.id" 
                        :class="activeCategories.id == item.id ? 'shadow-active bg-white' : ''"
                        class="flex flex-col items-center text-center w-[170px]"
                        @click="chooseButton(item)">
                            <p>
                                {{item.name}}
                            </p>
                            <p>
                                {{item.price}} сум
                            </p>
                        </ButtonRounded>
                    </div>
                </div>
                <div class="border-t-[1px] border-gray mt-8">
                    <div class="py-5 px-4 sm:px-12">
                        <div v-if="activeList == 3" class="flex flex-col gap-8">
                            <div v-for="(item, index) in numbers.content" :key="index" class="text-[#4f4f4f]">
                                <p class="font-semibold pb-2.5 border-b-[1px] border-gray">{{item[0]}} - {{item[1]}}</p>
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                                    <p @click="chooseNumber(item[0])" class="cursor-pointer">
                                        {{item[0]}}
                                    </p>
                                    <p class="cursor-pointer" v-for="(number, index) in item.slice(-1) - 2" :key="index"
                                    @click="chooseNumber(Number(item[0]) + number)">
                                        {{Number(item[0]) + number}}
                                    </p>
                                    <p class="cursor-pointer" @click="chooseNumber(item[1])">
                                        {{item[1]}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div @click="chooseNumber(item)" v-for="(item, index) in numbers.content" :key="index" class="text-[#4f4f4f] cursor-pointer">
                                {{item}}
                            </div>
                        </div>
                    </div>
                    <div v-if="numbers.content && numbers.content.length > 0" class="text-center">
                        <ButtonOutline class="!rounded-full !px-4 !py-2" @click="showMoreNumbers">
                            Показать больше
                        </ButtonOutline>
                    </div>
                    <p v-else class="text-center">
                        {{result}}
                    </p>
                </div>
            </div>
        </div>
        <div class="text-right">
            <ButtonError class="mt-2 mb-1"
            @click="closeSearchNumber">
                Закрыть
            </ButtonError>
        </div>
    </div>
</template>
<script>
import clearSymbols from '@/plugins/clearSymbols'
import Single from './inputs/single.vue'
import Input from '@/components/ui/inputs/default.vue'
import ButtonRounded from '@/components/ui/buttons/rounded.vue'
import ButtonError from '@/components/ui/buttons/error.vue'
import ButtonOutline from '@/components/ui/buttons/outline.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    name: 'BodySearchNumber',
    components: {
        ButtonRounded, ButtonError, ButtonOutline,
        Input, Single
    },
    data() {
        return {
            activeCategories: {
                id: 8
            },
            activeList: 1,
            number: '',
            someNumbers: '',
            dateNumber: '',
            mask: {
                zero: null,
                first: null,
                second: null,
                third: null,
                four: null,
                five: null,
                six: null,
                seven: null,
            },
            size: 10,
            categories: [],
            statusButton: {
                isDisabled: true
            },
            result: 'Загрузка...',
        }
    },
    computed: {
        list() {
            if(this.$route.path == '/registration-abonent' || this.$route.path == '/installment') {
                return [
                    {
                        id: 1,
                        img: {
                            src: require('@/assets/img/searchNumber/by-number.svg'),
                            alt: 'by-number'
                        },
                        title: 'Произвольный'
                    },
                    {
                        id: 2,
                        img: {
                            src: require('@/assets/img/searchNumber/random-number.svg'),
                            alt: 'random number'
                        },
                        title: 'Подбор по номеру'
                    },
                    {
                        id: 5,
                        img: {
                            src: require('@/assets/img/searchNumber/searchByMask.svg'),
                            alt: 'searchByMask'
                        },
                        title: 'По маске'
                    },
                ]
            } else {
                return [
                    {
                        id: 1,
                        img: {
                            src: require('@/assets/img/searchNumber/by-number.svg'),
                            alt: 'by-number'
                        },
                        title: 'Произвольный'
                    },
                    {
                        id: 2,
                        img: {
                            src: require('@/assets/img/searchNumber/random-number.svg'),
                            alt: 'random number'
                        },
                        title: 'Подбор по номеру'
                    },
                    {
                        id: 3,
                        img: {
                            src: require('@/assets/img/searchNumber/random-number.svg'),
                            alt: 'random number'
                        },
                        title: 'Несколько номеров'
                    },
                    {
                        id: 4,
                        img: {
                            src: require('@/assets/img/searchNumber/random-number.svg'),
                            alt: 'random number'
                        },
                        title: 'Подбор по дате'
                    },
                    {
                        id: 5,
                        img: {
                            src: require('@/assets/img/searchNumber/searchByMask.svg'),
                            alt: 'searchByMask'
                        },
                        title: 'По маске'
                    },
                ]
            }
        },
        title() {
            switch (this.activeList) {
                case 5:
                    return 'Подберите рисунок нового номера на ваш вкус: легко запоминающийся, красивый или содержащий счастливое число'
                case 2:
                    return 'Подберите себе номер с вашим любимым числом. Укажите от 1 до 6 цифр в поле ввода.'
                case 3:
                    return 'Подберите номера для всей семьи. Укажите количество необходимых похожих номеров.'
                case 4:
                    return 'Подберите себе номер по слову и цифрам к ним, например, BEELINE = 2335463, MAMA555 = 6262555.'
                default:
                    return 'Нажмите кнопку, и мы найдем для вас самые красивые номера'
            }
        },
        ...mapState({
            categoriesNumbers: state => state.categoriesNumbers,
            numbers: state => state.numbers,
            alert: state => state.Alert.alert
        }),
        abonentNumber() {
            return window.localStorage.getItem('abonentNumber') 
        },
        request() {
            let request
            if(this.activeList == 1) {
                request = `phone-numbers/random?page=0&size=${this.size}&warehouseId=${this.activeCategories.id}`
            }
            if(this.activeList == 2) {
                request = `phone-numbers/selection?page=0&size=${this.size}&warehouseId=${this.activeCategories.id}&mask=${this.number}`
            }
            if(this.activeList == 3) {
                request = `phone-numbers/consecutive?page=0&size=${this.size}&warehouseId=${this.activeCategories.id}&count=${this.someNumbers}`
            }
            if(this.activeList == 4) {
                request = `phone-numbers/selection-by-date?page=0&size=${this.size}&warehouseId=${this.activeCategories.id}&date=${this.dateNumber}`
            }
            if(this.activeList == 5) {
                request = `phone-numbers/selection-by-mask?page=0&size=${this.size}&warehouseId=${this.activeCategories.id}&mask=9989${!this.mask.zero ? '*' : this.mask.zero}${!this.mask.first ? '*' : this.mask.first}${!this.mask.second ? '*' : this.mask.second}${!this.mask.third ? '*' : this.mask.third}${!this.mask.four ? '*' : this.mask.four}${!this.mask.five ? '*' : this.mask.five}${!this.mask.six ? '*' : this.mask.six}${!this.mask.seven ? '*' : this.mask.seven}`
            }
            return request
        },
        // activeListNumber() {
        //     return this.listNumber[0]
        //     return {
        //             id: 1,
        //             technicalPriceplan: '**',
        //             priceplan: '**'
        //         }
        // },
        // result() {
        //     return 'Загрузка...'
        // }
    },
    methods: {
        ...mapMutations({
            change_search_number: 'searchNumber/CHANGE_SHOW',
            change_numbers: 'CHANGE_STATE',
            show_isConfirmation: 'SMSconfirmation/CHANGE_CONFIRMATION',
            change_alert: 'Alert/CHANGE_ALERT',
            clear_alert: 'Alert/CLEAR_ALERT'
        }),
        ...mapActions({
            get_page: 'get_pagedata',
            post_request: 'post_request'
        }),
        async searchNumber() {
            if(!this.statusButton.isDisabled) {
                if(this.activeList == 2) {
                    if(this.number.length > 0) {
                        let number = {
                            key: 'numbers',
                            body: []
                        }
                        this.change_numbers(number)
                            let payload = {
                            request: this.request,
                            key: 'numbers',
                            body: []
                        }
                        await this.get_page(payload)
                    } else {
                        let alert = {
                            isShow: true,
                            msg: 'Выберите номер!',
                            type: 'error'
                        }
                        this.change_alert(alert)
                        // setTimeout(() => {
                        //     this.clear_alert()
                        // }, 1000)
                    }
                } else if(this.activeList == 3) {
                    if(this.someNumbers.length > 0) {
                        let number = {
                            key: 'numbers',
                            body: []
                        }
                        this.change_numbers(number)
                            let payload = {
                            request: this.request,
                            key: 'numbers',
                            body: []
                        }
                        await this.get_page(payload)
                    } else {
                        let alert = {
                            isShow: true,
                            msg: 'Выберите количество номеров!',
                            type: 'error'
                        }
                        this.change_alert(alert)
                    }
                } else if(this.activeList == 4) {
                    if(this.dateNumber.length > 0) {
                        let number = {
                            key: 'numbers',
                            body: []
                        }
                        this.change_numbers(number)
                            let payload = {
                            request: this.request,
                            key: 'numbers',
                            body: []
                        }
                        await this.get_page(payload)
                    } else {
                        let alert = {
                            isShow: true,
                            msg: 'Выберите дату!',
                            type: 'error'
                        }
                        this.change_alert(alert)
                    }
                }
                else {
                    let number = {
                        key: 'numbers',
                        body: []
                    }
                    this.change_numbers(number)
                        let payload = {
                        request: this.request,
                        key: 'numbers',
                        body: []
                    }
                    await this.get_page(payload)
                }
                if(this.numbers.content.length == 0) {
                    this.result = 'Поиск не дал результата'
                } else this.result = 'Загрузка...'
            }
        },
        async get_categories() {
            let request = ''
            if(this.$route.path == '/installment') {
                request = 'warehouses/partial/categories'
            } else request = 'warehouses/categories'
            let payload = {
                request: request,
                key: 'categoriesNumbers',
                body: []
            }
            await this.get_page(payload)
            this.activeCategories = this.categoriesNumbers[0]
            this.categories = this.categoriesNumbers
            if(this.$route.path == '/installment') {
                this.categories = this.categories.filter(item => item.partialPayment)
                this.activeCategories = this.categories[0]
            } else this.activeCategories = this.categoriesNumbers[0]
            if(this.categories.length > 0) {
                this.statusButton.isDisabled = false
                this.searchNumber()
            } else this.statusButton.isDisabled = true
            let changedPhoneNumber = {
                key: 'changedPhoneNumber',
                body: {
                    number: '',
                    price: this.activeCategories.price
                }
            }
            this.change_numbers(changedPhoneNumber)
        },
        async chooseButton(e) {
            if(this.activeList == 2) {
                if(this.number.length > 0) {
                    this.activeCategories = e
                    this.size = 10
                    let number = {
                        key: 'numbers',
                        body: []
                    }
                    this.change_numbers(number)
                    let payload = {
                        request: this.request,
                        key: 'numbers',
                        body: []
                    }
                    await this.get_page(payload)
                } else {
                    let alert = {
                        isShow: true,
                        msg: 'Выберите номер!',
                        type: 'error'
                    }
                    this.change_alert(alert)
                    // setTimeout(() => {
                    //     this.clear_alert()
                    // }, 1000)
                }
            } else if(this.activeList == 3) {
                    if(this.someNumbers.length > 0) {
                        this.activeCategories = e
                        this.size = 10
                        let number = {
                            key: 'numbers',
                            body: []
                        }
                        this.change_numbers(number)
                            let payload = {
                            request: this.request,
                            key: 'numbers',
                            body: []
                        }
                        await this.get_page(payload)
                    } else {
                        let alert = {
                            isShow: true,
                            msg: 'Выберите количество номеров!',
                            type: 'error'
                        }
                        this.change_alert(alert)
                    }
                } else if(this.activeList == 4) {
                    if(this.dateNumber.length > 0) {
                        this.activeCategories = e
                        this.size = 10
                        let number = {
                            key: 'numbers',
                            body: []
                        }
                        this.change_numbers(number)
                            let payload = {
                            request: this.request,
                            key: 'numbers',
                            body: []
                        }
                        await this.get_page(payload)
                    } else {
                        let alert = {
                            isShow: true,
                            msg: 'Выберите дату!',
                            type: 'error'
                        }
                        this.change_alert(alert)
                    }
                } 
            else {
                this.activeCategories = e
                this.size = 10
                let number = {
                    key: 'numbers',
                    body: []
                }
                this.change_numbers(number)
                let payload = {
                    request: this.request,
                    key: 'numbers',
                    body: []
                }
                await this.get_page(payload)
            }
            if(this.numbers.content.length == 0) {
                this.result = 'Поиск не дал результата'
            } else this.result = 'Загрузка...'
        },
        changeActiveList(e) {
            this.activeList = e.id
            this.activeCategories = this.categoriesNumbers[0]
            let payload = {
                key: 'numbers',
                body: []
            }
            this.change_numbers(payload)
        },
        filterNumber() {
            this.number = clearSymbols(this.number)
        },
        filtersomeNumbers() {
            this.someNumbers = clearSymbols(this.someNumbers)
        },
        closeSearchNumber() {
            let payload = {
                key: 'changedPhoneNumber',
                body: {
                    number: '',
                    price: null
                }
            }
            this.change_numbers(payload)
            let numbers = {
                key: 'numbers',
                body: []
            }
            this.change_numbers(numbers)
            this.change_search_number(false)
            // if(this.$route.path.includes('user')) {
            //     this.$router.push('/home')
            // }
        },
        async chooseNumber(e) {
            if(this.$route.path.includes('user') || this.$route.path == '/change-sim') {
                let toNumber = e
                let payload = {
                    request: 'change-number/start',
                    body: {
                        warehouseId: this.activeCategories.id,
                        fromNumber: this.abonentNumber,
                        toNumber: toNumber,
                        passportSerial: 'ZZ',
                        passportNumber: '0000000'
                    }
                }
                await this.post_request(payload)
                if(this.alert.type == 'success') {
                    let payload = {
                        key: 'sms',
                        body: {
                            request: 'change-number/finish',
                            body: this.alert.msg
                        }
                    }
                    this.change_numbers(payload)
                    let abonent = {
                        key: 'abonent',
                        body: {
                            phoneNumber: window.localStorage.getItem('abonentNumber'),
                            code: ''
                        }
                    }
                    this.change_numbers(abonent)
                    this.show_isConfirmation(true)   
                }
            }else {
                let payload = {
                    key: 'changedPhoneNumber',
                    body: {
                        number: e,
                        price: this.activeCategories.price
                    }
                }
                this.change_numbers(payload)
                this.change_search_number(false)
                if(this.$route.path.includes('user')) {
                    this.$router.push('/home')
                }
            }
        },
        showMoreNumbers() {
            this.size = this.size + 10
            this.searchNumber()

        },
    },
    mounted() {
        this.get_categories()
    },
    watch: {
        activeList() {
            this.result = 'Выберите категорию'
        },
        'activeCategories.id'() {
            this.result = 'Загрузка...'
        }
    }
}
</script>
<style scoped>
.shadow {
    box-shadow: 0 3px 15px rgb(0 0 0 / 20%);
}
.shadow-active {
    box-shadow:
   inset 0 1px 3px rgba(0,10,20,.5),
   0 1px rgb(83,94,104),
   0 0 1px rgb(86,96,106);
}
</style>