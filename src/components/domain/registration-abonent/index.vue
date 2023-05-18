<template>
    <div>
        <Header title="Новая регистрация"/>
        <!-- <Tabs/> -->
        <div class="flex gap-8">
            <!-- <div class="w-2/5 flex flex-col gap-4">
                <File @sendFile="filterPassportScan" 
                title="Паспорт" 
                id="passport"
                fileName="passport_scan.png"/>
                <File @sendFile="filterPassportBackScan" 
                title="Прописка" 
                id="registration"
                fileName="passport_back_scan.png"/>
                <File @sendFile="filterDogovorScan" 
                title="Абон. Договор" 
                id="contract"
                fileName="dogovor_scan.png"/>
            </div> -->
            <div class="w-full xl:w-3/5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <Komplect
                        id="complect"
                        label="Номер комплекта"
                        v-model="info.phoneNumber"
                        :maxlength="maxlengthPhone"
                        :error="errorKomplect"
                        @update:modelValue="sendCTN"/>
                    </div>
                    <!-- <Komplect
                    id="sim"
                    label="Номер SIM"
                    type="number"
                    :error="errorSIM"
                    :listSimNumbers="listSimNumbers"
                    v-model="info.simNumber"
                    @update:modelValue="sendSIM"
                    maxlength="18"/> -->
                    <div class="text-base text-Vgray flex flex-col gap-2">
                        <label for="sim">
                            Номер SIM
                        </label>
                        <div class="h-20">
                            <input 
                            type="text" 
                            id="sim"
                            list="numbersSim"
                            class="w-full border-[1px] outline-0 p-4 rounded-xl"
                            :class="errorSIM.status ? 'border-red' : 'border-[#E2E8F0] focus:border-[#194BFB]'"
                            maxlength="18"
                            v-model="info.simNumber"
                            @input="sendSIM">
                            <p class="px-2 mt-1 text-sm text-red">
                                {{errorSIM.text}}
                            </p>
                            <datalist id="numbersSim">
                                <option v-for="(number, index) in listSimNumbers" :key="index" :value="number.icc"/>
                            </datalist>
                        </div>
                    </div>
                    <!-- <div v-else>
                        <div class="flex flex-col gap-2 text-base text-Vgray">
                            <label>
                                Номер SIM
                            </label>
                            <select class="select p-4 rounded-xl border-[1px] border-[#E2E8F0] focus:border-[#194BFB] outline-0"
                            @change="($event) => info.simNumber = $event.target.value">
                                <option selected hidden>
                                </option>
                                <option
                                v-for="(item, index) in listSimNumbers" 
                                :key="index" 
                                :value="item.icc">
                                    {{item.icc}}
                                </option>
                            </select>
                        </div>
                    </div> -->
                </div>
                <div class="flex flex-wrap gap-4 mb-4 items-end justify-between">
                    <!-- <Input
                    v-if="!isShowPinFL"
                    id="pinfl"
                    label="ПИН ФЛ"
                    v-model="info.pinfl"
                    maxlength="14"
                    @update:modelValue="filterPinFL"/> -->
                    <Select 
                    label="Тарифный план"
                    class="w-full sm:w-1/2"
                    :list="priceplans.priceplans ?? priceplans"
                    :active="activeTariff"
                    @change="changeTariff"/>
                    <Button class="h-fit"
                    v-if="isShowKonstructor"
                    @click="showKonstructor">
                        Настроить конструктор
                    </Button>
                </div>
                <div class="flex flex-wrap sm:flex-nowrap gap-4 items-center gap-0 sm:gap-4 mt-4">
                    <Disable class="w-full sm:w-1/2" id="number" label="Номер"
                    v-model="changedPhoneNumber.number"/>
                    <p class="w-full sm:w-[30%] text-sm pt-6">
                        Цена: {{changedPhoneNumber.price}} сум
                    </p>
                    <Button class="w-max sm:w-1/5 mt-6" @click="show_search_number(true)">Поиск</Button>
                </div>
                <Title class="my-4">Регистрационные данные</Title>
                <div class="flex flex-col">
                    <div class="flex flex-wrap sm:flex-nowrap gap-4">
                        <PrimarySelect class="w-full sm:w-[30%]" label="Тип документа"
                        :list="docTypes"
                        :active="info.docType"
                        @change="changeDocType($event.target.value)"/>
                        <div class="w-full sm:w-[70%] flex flex-col gap-4">
                            <div class="flex flex-wrap sm:flex-nowrap gap-4">
                                <Input
                                id="series"
                                label="Серия"
                                v-model="info.passportSerial"
                                placeholder="AA"
                                :type="maxlengthSeriesPassport == 2 ?  'latin' : 'NT'"
                                class="max-w-[55px]"
                                :maxlength="maxlengthSeriesPassport"
                                @update:modelValue="filterSeries"/>
                                <Input
                                id="passportNumber"
                                label="Номер"
                                v-model="info.passportNumber"
                                placeholder="0000000"
                                class="w-3/4 sm:w-2/5"
                                :maxlength="info.docType == 4 || info.docType == 3 ? null : 7"
                                @update:modelValue="filterPassportNumber"/>
                                <Date
                                id="date_issue"
                                label="Дата выдачи"
                                placeholder="DD-MM-YYYY"
                                v-model="info.docIssue"
                                class="w-full sm:w-2/5"
                                maxlength="10"
                                @update:modelValue="changeDocIssue($event)"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-start">
                        <div class="flex gap-4 items-end">
                            <Country label="Выберите страну"
                            v-if="info.docType == 4"
                            :list="countries"
                            @change="(e) => info.countryCode = e.target.value"/>
                            <p v-if="page && page.success && isShowFindClient && page.count" class="text-[#2db32d]">Клиент найден! <br/> Количество номеров: {{page.count}}</p>
                            <p v-if="page && isShowFindClient && !page.count" class="text-vbi-red">Клиент не найден! </p>
                        </div>
                        <Button v-if="info.docType == 1 || info.docType == 2 || info.docType == 5"
                        class="ml-auto" :isDisable="isCheckPassport" @click="checkPassport">
                            Проверить
                        </Button>
                    </div>
                </div>
                <div class="flex flex-col gap-4 mt-4">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                        id="surname"
                        :disabled="statuses.surname"
                        type="extradition"
                        label="Фамилия"
                        v-model="info.surname"
                        @update:modelValue="filterSurname"/>
                        <Input
                        id="name"
                        :disabled="statuses.name"
                        type="extradition"
                        label="Имя"
                        v-model="info.name"
                        @update:modelValue="filterName"/>
                        <Input
                        id="patronymic"
                        :disabled="statuses.patronymic"
                        type="extradition"
                        label="Отчество"
                        v-model="info.patronymic"
                        @update:modelValue="filterPatronymic"/>
                    </div>
                    <div class="flex flex-wrap sm:flex-nowrap gap-4">
                        <Date
                        id="date_of_birth"
                        :disabled="statuses.birthDate"
                        label="Дата рождения"
                        placeholder="DD-MM-YYYY"
                        v-model="info.birthDate"
                        class="w-full sm:w-2/4"
                        maxlength="10"
                        @update:modelValue="changeBirthDate($event)"/>
                        <PrimarySelect label="Пол" :list="gender"
                        class="w-full sm:w-[20%]"
                        :active="info.gender"
                        :disabled="statuses.gender"
                        @change="changeGender($event)"/>
                        <Input
                        id="extradition"
                        class="w-full sm:w-[30%]"
                        :disabled="statuses.docAuthority"
                        label="Кем выдан"
                        type="extradition"
                        v-model="info.docAuthority"
                        @update:modelValue="filterExtradition"/>
                    </div>
                    <div class="flex items-center gap-4"
                    v-if="!isShowPinFL">
                        <Input
                        id="pinfl"
                        label="ПИН ФЛ"
                        v-model="info.pinfl"
                        maxlength="14"
                        class="w-1/2"
                        @update:modelValue="filterPinFL"/>
                        <svg v-if="kontrolAmount.status == 'success'" fill="none" stroke="#2db32d" width="24" height="24">
                            <use xlink:href="#check"/>
                        </svg>
                        <svg v-if="kontrolAmount.status == 'error'" fill="none" stroke="#ff0000" width="24" height="24">
                            <use xlink:href="#error"/>
                        </svg>
                    </div>
                    <Area 
                    label="Область"
                    class="w-full sm:w-1/2"
                    :list="area"
                    :active="info.regionId"
                    @change="changeArea"/>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="w-full sm:w-1/2 flex flex-col gap-2">
                            <p>Населенный пункт</p>
                            <PrimarySelect :list="points"
                            :active="info.localityType"
                            @change="changeLocalityType($event)"/>
                        </div>
                        <Input
                        id="city"
                        class="w-full sm:w-1/2 mt-[30px]"
                        v-model="info.city"
                        @update:modelValue="filterCity"/>
                    </div>
                    <div class="w-full sm:w-2/3 flex flex-wrap sm:flex-nowrap gap-4">
                        <Input
                        id="street"
                        class="w-full sm:w-3/5"
                        label="Улица"
                        v-model="info.streetAddress"
                        @update:modelValue="filterStreet"/>
                        <Input
                        id="house"
                        class="w-full sm:w-1/5"
                        label="Дом"
                        v-model="info.houseNo"
                        @update:modelValue="filterHouse"/>
                        <Input
                        id="flat"
                        class="w-full sm:w-1/5"
                        label="Кв."
                        v-model="info.apartmentNumber"
                        @update:modelValue="filterFlat"/>
                    </div>
                </div>
                <div class="mt-4 flex flex-wrap sm:flex-nowrap gap-4">
                    <Button class="min-w-[100px]" @click="printout">
                        <img class="mx-auto" src="@/assets/img/print.svg" alt="Print Icon">
                    </Button>
                    <Button class="uppercase font-medium" @click="saveDraft"> Сохранить Черновик</Button>
                    <Button @click="registration" :isDisable="isRegistration">Регистрация</Button>
                </div>
                <div class="flex items-center gap-4 mt-4">
                    <Button :class="isCheckBalance ? 'block' : 'hidden'" @click="checkBalance">Проверить баланс</Button>
                    <Button :class="isCheckTariff ? 'block' : 'hidden'" 
                    :isDisable="isDisableCheckTariff"
                    @click="checkTariff">Активация тарифа</Button>
                    <Button :class="isCheckNumber ? 'block' : 'hidden'" 
                    :isDisable="isDisableCheckNumber"
                    @click="checkNumber">Заменить номер</Button>
                    <!-- <Button :isDisable="isBonus" @click="sendBonus">Отправить в копилку</Button> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api'
import moment from 'moment'
import rotateString from '@/plugins/rotateString'
import {mapState, mapMutations, mapActions} from 'vuex'
import clearSymbols from '@/plugins/clearSymbols'
import Title from '@/components/ui/titles/lg-semibold.vue'
import Input from '@/components/ui/inputs/default.vue'
import Select from '@/components/ui/selects/default.vue'
import Disable from '@/components/ui/inputs/disable.vue'
import Button from '@/components/ui/buttons/rounded.vue'
import Country from '@/components/ui/selects/country.vue'
import Area from '@/components/ui/selects/area.vue'
import Date from '@/components/ui/inputs/date.vue'
import Header from '@/components/ui/header.vue'
import Komplect from '@/components/ui/inputs/komplect.vue'
import PrimarySelect from '@/components/ui/selects/primary.vue'
export default {
    name: 'RegistrationAbonentComponent',
    components: {
        Title, Select, Disable, Button,
        Area,
        // File, 
        Country, Input, Date,
        Header,
        Komplect,
        PrimarySelect
        // Tabs
    },
    data() {
        return {
            info: {
                registrationId: null,
                pinfl: '', 
                phoneNumber: '',
                simNumber: '8999804',
                name: '',
                patronymic: '',
                surname: '',
                passportSerial: '',
                passportNumber: '',
                passport_scan: null,
                passport_back_scan: null,
                dogovor_scan: null,
                gender: '',
                birthDate: '',
                docIssue: '',
                docAuthority: '',
                streetAddress: '',
                houseNo: '',
                apartmentNumber: '',
                docType: '',
                city: '',
                localityType: '',
                countryCode: 'UZB',
                regionId: ''
            },
            points: [
                {
                    id: 1,
                    value: 1,
                    text: 'Город'
                },
                // {
                //     id: 2,
                //     value: 2,
                //     text: 'Поселок'
                // },
                {
                    id: 3,
                    value: 3,
                    text: 'Район'
                }
            ],
            gender: [
                {
                    id: 1,
                    value: 'M',
                    text: 'Мужской'
                },
                {
                    id: 2,
                    value: 'F',
                    text: 'Женский'
                }
            ],
            docTypes: [
                {
                    id: 1,
                    value: 1,
                    text: 'Паспорт'
                },
                {
                    id: 3,
                    value: 3,
                    text: 'Военный билет'
                },
                {
                    id: 2,
                    value: 2,
                    text: 'Водительские права'
                },
                {
                    id: 4,
                    value: 4,
                    text: 'Паспорт иностранного гражданина'
                },
                {
                    id: 5,
                    value: 5,
                    text: 'ID карта'
                },
            ],
            isScan: true,
            isRegistration: true,
            isCheckBalance: false,
            isCheckTariff: false,
            isDisableCheckTariff: false,
            isCheckNumber: false,
            isDisableCheckNumber: false,
            isSuccess: false,
            isCheckPassport: true,
            isBonus: true,
            isStatus: false,
            maxlengthPhone: 12,
            maxlengthSeriesPassport: 2,
            isShowPinFL: false,
            isShowKonstructor: false,
            isShowFindClient: false,
            errorKomplect: {
                status: false,
                text: ''
            },
            errorSIM: {
                status: false,
                text: ''
            },
            statuses: {
                name: false,
                surname: false,
                patronymic: false,
                birthDate: false,
                gender: false,
                docAuthority: false,
            },
            kontrolAmount: {
                amount: '',
                status: ''
            },
            isSimNumbers: true,
            listSimNumbers: []
        }
    },
    computed: {
        ...mapState({
            countries: state => state.countries,
            priceplans: state => state.priceplans,
            statistics: state => state.statistics,
            registrationId: state => state.registrationId,
            scan: state => state.scan,
            changedPhoneNumber: state => state.changedPhoneNumber,
            alert: state => state.Alert.alert,
            page: state => state.page,
            dataPage: state => state.data,
            activeTariff: state => state.activeTariff,
            area: state => state.area
        }),
    },
    methods: {
        ...mapMutations({
            change_alert: 'Alert/CHANGE_ALERT',
            clear_alert: 'Alert/CLEAR_ALERT',
            show_search_number: 'searchNumber/CHANGE_SHOW',
            change_state: 'CHANGE_STATE',
        }),
        ...mapActions({
            get_pagedata: 'get_pagedata',
            post_request: 'post_request',
            post_scan: 'post_scan'
        }),
        showKonstructor() {
            let payload = {
                key: 'isKonstructor',
                body: true
            }
            this.change_state(payload)
        },
        filterRegistration() {
            if(this.isStatus && this.isSuccess) {
                this.isRegistration = false
            } else {
                this.isRegistration = true
            }
        },
        async registration() {
            if(!this.isRegistration) {
                let payload = {
                    request: 'registrations/register',
                    body: {
                        registrationId: this.registrationId,
                        file: [
                            this.info.passport_scan,
                            this.info.passport_back_scan,
                            this.info.dogovor_scan
                        ]
                    },
                    headers: {
                        headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    }
                }
                await this.post_request(payload)
                if(this.alert.type == 'success') {
                    this.isCheckBalance = true
                } 
                this.isRegistration = true
            }
        },
        getPriceplans() {
            let payload = {
                request: 'equipments/priceplans',
                key: 'priceplans',
                body: []
            }
            this.get_pagedata(payload)
        },
        async sendCTN() {
            if(this.info.phoneNumber.length > 0) {
                if(!this.info.phoneNumber.startsWith('99')) {
                this.maxlengthPhone = 2
                } else {
                    if(!this.info.phoneNumber.startsWith('998')) {
                        this.maxlengthPhone = 3
                    } else {
                        this.maxlengthPhone = 12
                    }
                }
            } else this.maxlengthPhone = 12
            this.info.phoneNumber = clearSymbols(this.info.phoneNumber)
            if(this.info.phoneNumber.length === 12) {
                let res = await api.get(`equipments/find-by-phone-number?phoneNumber=${this.info.phoneNumber}`)
                if(res.data.success) {
                    let value = res.data.equipments[0]
                    this.info.simNumber = value.icc
                    // let activeTariff = {
                    //     key: 'activeTariff',
                    //     body: {
                    //         price: value.price,
                    //         priceplan: value.priceplan,
                    //         technicalPriceplan: value.technicalPriceplan
                    //     }
                    // }
                    // this.change_state(activeTariff)
                    let priceplans = {
                        key: 'priceplans',
                        body: res.data.availablePriceplans
                    }
                    this.change_state(priceplans)
                    // this.isShowKonstructor = value.availableConstructor
                } else {
                    let alert = {
                        isShow: true,
                        msg: res.data.message,
                        type: 'error'
                    }
                    this.change_alert(alert)
                    // setTimeout(() => {
                    //     this.clear_alert()
                    // }, 1000)
                    this.info.simNumber = ''
                    let activeTariff = {
                        key: 'activeTariff',
                        body: {
                            price: null,
                            priceplan: '',
                            technicalPriceplan: ''
                        }
                    }
                    this.change_state(activeTariff)
                    // this.isShowKonstructor = false
                }
            } else {
                this.info.simNumber = ''
                let activeTariff = {
                    key: 'activeTariff',
                    body: {
                        price: null,
                        priceplan: '',
                        technicalPriceplan: ''
                    }
                }
                this.change_state(activeTariff)
                // this.isShowKonstructor = false
            }
            this.filterScan()
            this.filterRegistration()
        },
        async sendSIM() {
            if(this.info.simNumber.length == 0) {
                this.getPriceplans()
            } 
            if(this.info.simNumber.length == 18) {
                let res = await api.get(`equipments/find-by-serial-number?serialNumber=${this.info.simNumber}`)
                if(res.data.success) {
                    let value = res.data.equipments[0]
                    this.info.phoneNumber = value.phoneNumber
                    // let activeTariff = {
                    //     key: 'activeTariff',
                    //     body: {
                    //         price: value.price,
                    //         priceplan: value.priceplan,
                    //         technicalPriceplan: value.technicalPriceplan
                    //     }
                    // }
                    // this.change_state(activeTariff)
                    let priceplans = {
                        key: 'priceplans',
                        body: res.data.availablePriceplans
                    }
                    this.change_state(priceplans)
                    // this.isShowKonstructor = value.availableConstructor
                } else {
                    let alert = {
                        isShow: true,
                        msg: res.data.message,
                        type: 'error'
                    }
                    this.change_alert(alert)
                    // setTimeout(() => {
                    //     this.clear_alert()
                    // }, 1000)
                    this.info.phoneNumber = ''
                    let activeTariff = {
                        key: 'activeTariff',
                        body: {
                            price: null,
                            priceplan: '',
                            technicalPriceplan: ''
                        }
                    }
                    this.change_state(activeTariff)
                    // this.isShowKonstructor = false
                }
            } else {
                this.info.phoneNumber = ''
                let activeTariff = {
                        key: 'activeTariff',
                        body: {
                            price: null,
                            priceplan: '',
                            technicalPriceplan: ''
                        }
                    }
                    this.change_state(activeTariff)
                // this.isShowKonstructor = false
            }
            this.filterScan()
            this.filterRegistration()
        },
        async changeTariff(item) {
            this.listSimNumbers = []
            let res
            if(this.info.simNumber.length <= 7 || this.info.phoneNumber.length == 0) {
                res = await api.get(`equipments/find-by-priceplan?priceplan=${item.target.value}`)
                this.listSimNumbers = res.data.equipments
            }
            // let value = res.data.equipments[0]
            // if(this.info.phoneNumber.length == 0) {
            //     this.info.phoneNumber = value.phoneNumber
            // }
            if(this.info.simNumber == '8999804') {
                this.info.simNumber = ''
            }
            // this.info.simNumber = value.icc
            if(this.info.simNumber.length == 0 || this.info.simNumber == '8999804') {
                this.isSimNumbers = false
            }
            let activeTariff = {
                key: 'activeTariff',
                body: {
                    price: null,
                    priceplan: '',
                    technicalPriceplan: item.target.value
                }
            }
            this.change_state(activeTariff)
            let konstructor
            if(this.priceplans.priceplans) {
                this.priceplans.priceplans.forEach((val) => {
                    if(val.technicalPriceplan == item.target.value) {
                        konstructor = val
                    }
                })
            } else {
                this.priceplans.forEach((val) => {
                    if(val.technicalPriceplan == item.target.value) {
                        konstructor = val
                    }
                })
            }
            // this.isShowKonstructor = value.availableConstructor
            this.isShowKonstructor = konstructor.availableConstructor
            this.filterScan()
            this.filterRegistration()
        },
        async getSingleRegistration(e) {
            try {
                let res = await api.get(`registrations/history/${e}`)
                this.isNew = true
                this.info = res.data
            }catch(err) {
                console.log(err);
            }
        },
        async getCountries() {
            let payload = {
                request: 'countries',
                body: [],
                key: 'countries'
            }
            this.get_pagedata(payload)
        },
        filterPassportScan(e) {
            this.info.passport_scan = e
            this.filterRegistration()
        },
        filterPassportBackScan(e) {
            this.info.passport_back_scan = e
            this.filterRegistration()
        },
        filterDogovorScan(e) {
            this.info.dogovor_scan = e
            this.filterRegistration()
        },
        filterSeries() {
            this.info.passportSerial = this.info.passportSerial.toUpperCase()
            this.filterScan()
            this.filterRegistration()
            this.filterCheckPassport()
        },
        filterPassportNumber() {
            this.info.passportNumber = clearSymbols(this.info.passportNumber)
            this.filterScan()
            this.filterRegistration()
            this.filterCheckPassport()
        },
        filterCheckPassport() {
            this.isShowFindClient = false
            if(this.info.docType.length > 0 && this.info.passportSerial.length >= 2 && this.info.passportNumber.length == 7 && this.info.docIssue.length == 10) {
                this.isCheckPassport = false
            } else {
                this.isCheckPassport = true
            }
        },
        async checkPassport() {
            if(!this.isCheckPassport) {
                let payload = {
                    request: 'registrations/check-passport',
                    body: {
                        docType: this.info.docType,
                        passportNumber: this.info.passportNumber,
                        passportSerial: this.info.passportSerial,
                        docIssue: this.info.docIssue
                    },
                    key: 'page'
                }
                await this.post_request(payload)
                this.isShowFindClient = true
                if(this.alert.type == 'success' && this.page.count > 0) {  
                    this.info.apartmentNumber = this.page.subscriber.apartmentNumber
                    this.info.birthDate = moment(this.page.subscriber.birthDate).format('DD-MM-YYYY')
                    this.info.city = this.page.subscriber.city
                    this.info.docAuthority = this.page.subscriber.docAuthority
                    this.info.gender = this.page.subscriber.gender
                    this.info.houseNo = this.page.subscriber.houseNo
                    this.info.localityType = this.page.subscriber.localityType
                    this.info.name = this.page.subscriber.name ?? this.info.name
                    this.info.patronymic = this.page.subscriber.patronymic
                    this.info.surname = this.page.subscriber.surname
                    this.info.streetAddress = this.page.subscriber.streetAddress
                    if(this.info.name.length > 0) {
                        this.statuses.name = true
                    }
                    if(this.info.surname.length > 0) {
                        this.statuses.surname = true
                    }
                    if(this.info.patronymic.length > 0) {
                        this.statuses.patronymic = true
                    }
                    if(this.info.birthDate.length > 0) {
                        this.statuses.birthDate = true
                    }
                    if(this.info.gender.length > 0) {
                        this.statuses.gender = true
                    }
                    if(this.info.docAuthority.length > 0) {
                        this.statuses.docAuthority = true
                    }
                    if(this.info.gender.length > 0) {
                        this.statuses.gender = true
                    }
                } else {
                    this.info.apartmentNumber = ''
                    this.info.birthDate = ''
                    this.info.city = ''
                    this.info.docAuthority = ''
                    this.info.gender = ''
                    this.info.houseNo = ''
                    this.info.localityType = ''
                    this.info.name = ''
                    this.info.patronymic = ''
                    this.info.surname = ''
                    this.info.streetAddress = ''
                    for(let key in this.statuses) {
                        this.statuses[key] = false
                    }
                }
            }
        },
        filterPinFL() {
            this.info.pinfl = clearSymbols(this.info.pinfl)
            this.filterRegistration()
            if(this.info.pinfl.length == 14) {
                let amount = []
                let pinFL = this.info.pinfl.split('')
                pinFL.pop()
                pinFL.forEach((item, index) => {
                    if(index == 0 || index == 3 || index == 6 || index == 9 || index == 12) {
                        item = item * 7
                        amount.push(item)
                    }
                    else if(index == 1 || index == 4 || index == 7 || index == 10) {
                        item = item * 3
                        amount.push(item)
                    } else {
                        item = item * 1
                        amount.push(item)
                    }
                })
                if(this.info.pinfl.slice(-1) == amount.reduce((acc, number) => acc + number, 0) % 10) {
                    this.kontrolAmount.status = 'success'
                    this.kontrolAmount.amount = amount.reduce((acc, number) => acc + number, 0) % 10
                } else {
                    this.kontrolAmount.status = 'error'
                    this.kontrolAmount.amount = amount.reduce((acc, number) => acc + number, 0) % 10
                }
            } else {
                this.kontrolAmount.status = ''
                this.kontrolAmount.amount = ''
            }
            this.filterScan()
        },
        filterSurname() {
            this.filterScan()
            this.filterRegistration()
        },
        filterName() {
            this.filterScan()
            this.filterRegistration()
        },
        filterPatronymic() {
            this.filterScan()
            this.filterRegistration()
        },
        filterExtradition() {
            this.filterScan()
            this.filterRegistration()
        },
        filterCity() {
            this.filterScan()
            this.filterRegistration()
        },
        filterStreet() {
            this.filterScan()
            this.filterRegistration()
        },
        filterHouse() {
            this.filterScan()
            this.filterRegistration()
        },
        filterFlat() {
            this.filterScan()
            this.filterRegistration()
        },
        async printout() {
            let nowDate = moment().format('YYYY-MM-DD')
            let birthDate = this.info.birthDate
            let dateDocIssue = rotateString(this.info.docIssue, '-')
            dateDocIssue = moment(dateDocIssue).add(1, 'day')
            birthDate = rotateString(birthDate, '-')
            let oldBirthDate = moment(birthDate).add(18, 'years').format('YYYY-MM-DD');
            birthDate = moment(birthDate).add(16, 'years').format('YYYY-MM-DD');
            if(!this.isScan) {
                if(!moment(birthDate).isBefore(dateDocIssue) && moment(oldBirthDate).isAfter(nowDate)) {
                    let alert = {
                        isShow: true,
                        msg: 'Разница между датой выдачи паспорта и датой рождения должна быть больше 16 лет и Дата рождения не менее 18 лет',
                        type: 'error'
                    }
                    this.change_alert(alert)
                }
                else if(moment(oldBirthDate).isAfter(nowDate)) {
                    let alert = {
                        isShow: true,
                        msg: 'Дата рождения не менее 18 лет',
                        type: 'error'
                    }
                    this.change_alert(alert)
                } 
                else if(!moment(birthDate).isBefore(dateDocIssue)) {
                    let alert = {
                        isShow: true,
                        msg: 'Разница между датой выдачи паспорта и датой рождения должна быть больше 16 лет',
                        type: 'error'
                    }
                    this.change_alert(alert)
                }
                 else {
                    let payload = {
                        request: 'registrations/generate-application-pdf',
                        body: {
                            "phoneNumber": this.info.phoneNumber,
                            "simNumber": this.info.simNumber,
                            "name": this.info.name, 
                            "patronymic": this.info.patronymic,
                            "surname": this.info.surname,
                            "birthDate": this.info.birthDate, 
                            "docType": this.info.docType,
                            "docIssue": this.info.docIssue, 
                            "docAuthority": this.info.docAuthority,
                            "pinfl": this.info.pinfl, 
                            "passportSerial": this.info.passportSerial,
                            "passportNumber": this.info.passportNumber,
                            "gender": this.info.gender,
                            "apartmentNumber": this.info.apartmentNumber, 
                            "city": this.info.city,
                            "localityType": this.info.localityType, 
                            "houseNo": this.info.houseNo,
                            "streetAddress": this.info.streetAddress, 
                            "countryCode": this.info.countryCode,
                            "changedPhoneNumber": this.changedPhoneNumber.number,
                            "isPartialPayment": false,
                            "targetPriceplan": this.activeTariff.technicalPriceplan,
                            "regionId": this.info.regionId
                        },
                        headers: {
                            'responseType': 'blob'
                        },
                    }
                    await this.post_scan(payload)
                        if(this.alert.type == 'success') {
                            this.isSuccess = true
                            this.isStatus = true
                            this.isScan = true
                            this.filterRegistration()
                            let test = document.createElement('a');
                            test.href = this.scan
                            test.setAttribute('download', 'contract.pdf');
                            document.body.appendChild(test);
                            test.click()
                            open(test)
                        } else {
                            console.log('Ошибка во время распечатки скана');
                        }
                }
            }
        },
        filterScan() {
            let date = moment().format('YYYY-MM-DD')
            let dateDocIssue = rotateString(this.info.docIssue, '-')
            let dateBirth = rotateString(this.info.birthDate, '-')
            this.info.localityType = String(this.info.localityType)
            if(this.info.docType == 4 || this.info.docType == 3) {
                if(this.info.phoneNumber.length > 0 && this.info.simNumber.length > 0 && this.info.docType.length > 0 && this.kontrolAmount.status == 'success' && this.info.regionId.length > 0 && this.info.passportSerial.length > 0 && this.info.regionId.length > 0 && this.info.passportNumber.length > 0 && this.info.docIssue.length == 10 && dateDocIssue < date && this.info.surname.length > 0 && this.info.name.length > 0 && this.info.patronymic.length > 0 && this.info.birthDate.length == 10 && dateBirth < date && this.info.docAuthority.length > 0 && this.info.localityType.length > 0 && this.info.city.length > 0 && this.info.streetAddress.length > 0 && this.info.houseNo.length > 0 && this.info.apartmentNumber.length > 0 && this.activeTariff.technicalPriceplan.length > 0){
                    this.isScan = false
                    this.isStatus = false
                } else {
                    this.isSuccess = false
                    this.isScan = true
                }
            } else {
                if(this.info.phoneNumber.length > 0 && this.info.simNumber.length > 0 && this.info.pinfl.length > 0 && this.kontrolAmount.status == 'success' && this.info.regionId.length > 0 && this.info.docType.length > 0 && this.info.regionId.length > 0 && this.info.passportSerial.length == 2 && this.info.passportNumber.length > 0 && this.info.docIssue.length == 10 && dateDocIssue < date && this.info.surname.length > 0 && this.info.name.length > 0 && this.info.patronymic.length > 0 && this.info.birthDate.length == 10 && dateBirth < date && this.info.docAuthority.length > 0 && this.info.localityType.length > 0 && this.info.city.length > 0 && this.info.streetAddress.length > 0 && this.info.houseNo.length > 0 && this.info.apartmentNumber.length > 0 && this.activeTariff.technicalPriceplan.length > 0){
                    this.isScan = false
                    this.isStatus = false
                } else {
                    this.isSuccess = false
                    this.isScan = true
                }
            }
        },
        async saveDraft() {
            let payload = {
                request: 'registrations/save-to-draft',
                // body: this.info
                body: {
                    "phoneNumber": this.info.phoneNumber,
                    "simNumber": this.info.simNumber,
                    "name": this.info.name, 
                    "patronymic": this.info.patronymic,
                    "surname": this.info.surname,
                    "birthDate": this.info.birthDate, 
                    "docType": this.info.docType,
                    "docIssue": this.info.docIssue, 
                    "docAuthority": this.info.docAuthority,
                    "pinfl": this.info.pinfl, 
                    "passportSerial": this.info.passportSerial,
                    "passportNumber": this.info.passportNumber,
                    "gender": this.info.gender,
                    "apartmentNumber": this.info.apartmentNumber, 
                    "city": this.info.city,
                    "localityType": this.info.localityType, 
                    "houseNo": this.info.houseNo,
                    "streetAddress": this.info.streetAddress, 
                    "countryCode": this.info.countryCode,
                    "changedPhoneNumber": this.changedPhoneNumber.number,
                    "isPartialPayment": false,
                    "targetPriceplan": this.activeTariff.technicalPriceplan,
                    "regionId": this.info.regionId
                },
            }
            await this.post_request(payload)
            if(this.alert.type == 'success') {
                window.location.reload()
            }
        },
        changeDocType(e) {
            this.info.docType = e
            if(this.info.docType !== 4) {
                this.info.countryCode = 'UZB'
            }
            if(this.info.docType == 4 || this.info.docType == 3) {
                this.maxlengthSeriesPassport = null
            } else this.maxlengthSeriesPassport = 2
            if(this.info.docType == 4 || this.info.docType == 3) {
                this.kontrolAmount.status = 'success'
            } else this.kontrolAmount.status = ''
            this.filterScan()
            this.filterCheckPassport()
            this.filterRegistration()
        },
        changeDocIssue(e) {
            this.info.docIssue = e
            this.filterScan()
            this.filterCheckPassport()
            this.filterRegistration()
        },
        changeBirthDate(e) {
            this.info.birthDate = e
            this.filterScan()
            this.filterRegistration()
        },
        changeGender(e) {
            this.info.gender = e.target.value
            this.filterScan()
        },
        changeLocalityType(e) {
            this.info.localityType = e.target.value
            this.filterScan()
            this.filterRegistration()
        },
        async checkBalance() {
            let payload = {
            request: `registrations/${this.registrationId}/check-balance`,
            body: 'page'
            }
            await this.post_request(payload)
            if(this.alert.type == 'success' && this.isCheckBalance) {
                this.isCheckBalance = false
                this.isCheckTariff = true
            }
        },
        async checkTariff() {
            if(!this.isDisableCheckTariff) {
                this.isDisableCheckTariff = true
                let payload = {
                request: `registrations/${this.registrationId}/change-priceplan`,
                }
                await this.post_request(payload)
                if(this.alert.type == 'success' && this.isCheckTariff) {
                    this.isCheckTariff = false
                    this.isBonus = false
                    if(this.changedPhoneNumber.number.length > 0) {
                        this.isCheckNumber = true
                    }
                } else {
                    window.location.reload()
                }
            }
        },
        async checkNumber() {
            if(!this.isDisableCheckNumber) {
                this.isDisableCheckNumber = true
                let payload = {
                request: `registrations/${this.registrationId}/change-number`,
                }
                await this.post_request(payload)
                if(this.alert.type == 'success' && this.isCheckNumber) {
                    this.isCheckNumber = false
                    let alert = {
                        isShow: true,
                        msg: 'Успешно!',
                        type: 'success'
                    }
                    this.change_alert(alert)
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                }
            }
        },
        get_info() {
            if(this.dataPage !== null) {
                for (let key in this.info) {
                    for (let val in this.dataPage) {
                        if(key === val) {
                            this.info[key] = this.dataPage[val];
                            if(this.info[key] === null) {
                                this.info[key] = ''
                            }
                        }
                    }
                }
            }
        },
        async sendBonus() {
            if(!this.isBonus) {
                let payload = {
                    request: `registrations/bonus?phoneNumber=${this.info.phoneNumber}`,
                }
                await this.post_request(payload)
                this.isBonus = true
                if(!this.isCheckNumber) {
                    let alert = {
                        isShow: true,
                        msg: 'Успешно!',
                        type: 'success'
                    }
                    this.change_alert(alert)
                    location.reload()
                }
            }
        },
        get_area() {
            let payload = {
                request: 'regions',
                key: 'area',
                body: []
            }
            this.get_pagedata(payload)
        },
        changeArea(e) {
            this.info.regionId = e.target.value
            this.filterScan()
        }
    },
    watch: {
        $route() {
            let payload = {
                    key: 'changedPhoneNumber',
                    body: {
                        number: '',
                        price: ''
                    }
                }
                this.change_state(payload)
        },
        changedPhoneNumber() {
            this.filterScan()
        },
        info: {
            handler() {
                if(this.info.passportSerial.length >= 2 && this.info.passportNumber.length == 7 && this.info.docIssue.length == 10 && (this.info.docType == 1 || this.info.docType == 2 || this.info.docType == 5)) {
                    this.isCheckPassport = false
                }
            },
            deep: true
        },
        'info.docType'() {
            if(this.dataPage == null) {
                this.info.passportSerial = ''
                this.info.passportNumber = ''
            }
            if(this.info.docType == 4 || this.info.docType == 3) {
                this.isShowPinFL = true
            } else this.isShowPinFL = false
        },
        'info.phoneNumber'() {
            if(this.info.phoneNumber.length == 0) {
                this.errorKomplect.status = true
                this.errorKomplect.text = 'Это поле обязателен для заполнения'
            } else {
                this.errorKomplect.status = false
                this.errorKomplect.text = ''
            }
        },
        'info.simNumber'() {
            if(this.info.simNumber.length == 0) {
                this.errorSIM.status = true
                this.errorSIM.text = 'Это поле обязателен для заполнения'
            } else {
                this.errorSIM.status = false
                this.errorSIM.text = ''
            }
        },
        'activeTariff.technicalPriceplan'() {
            if(!this.isRegistration) {
                this.isScan = false
                this.isRegistration = true
            }
        },
        'changedPhoneNumber.number'() {
            if(!this.isRegistration) {
                this.isScan = false
                this.isRegistration = true
            }
            if(this.changedPhoneNumber.number) {
                let payload = {
                request: `registrations/book-phone-number?phoneNumber=${this.changedPhoneNumber.number}`
                }
                this.post_request(payload)
            }
        },
    },
    mounted() {
        this.getPriceplans()
        this.getCountries()
        this.get_area()
        this.get_info()
    },
}
</script>
<style scoped>
.shadow {
    box-shadow: 0 4px 4px rgb(156 156 156 / 25%);
}
.select {
    -webkit-appearance: none;
    background: url('@/assets/img/arrow-down.png') 95% 50% no-repeat;
}
</style>