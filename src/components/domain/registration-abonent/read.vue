<template>
    <div>
        <Header title="Просмотр регистрации"/>
        <div v-if="registration" 
        class="w-full xl:w-3/5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                id="complect"
                label="Номер комплекта"
                v-model="registration.phoneNumber"/>
                <Input
                id="sim"
                label="Номер SIM"
                v-model="registration.simNumber"/>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                id="tariff"
                label="Тарифный план"
                v-model="registration.priceplan"/>
                <Input
                id="changedPhoneNumber"
                label="Номер"
                v-model="registration.changedPhoneNumber"/>
            </div>
            <Title class="my-4">Регистрационные данные</Title>
            <div class="flex flex-wrap sm:flex-nowrap gap-4">
                <Input class="w-full sm:w-[30%]" label="Тип документа"
                v-model="docType"/>
                <div class="flex flex-wrap sm:flex-nowrap gap-4">
                    <Input
                    id="series"
                    label="Серия"
                    v-model="registration.passportSerial"
                    class="max-w-[55px]"/>
                    <Input
                    id="passportNumber"
                    label="Номер"
                    v-model="registration.passportNumber"
                    class="w-3/4 sm:w-2/5"/>
                    <Input
                    id="date_issue"
                    label="Дата выдачи"
                    v-model="registration.docIssue"
                    class="w-full sm:w-2/5"/>
                </div>
                <Input class="w-full sm:w-1/2" label="Страна"
                v-model="registration.countryCode"/>
            </div>
            <div class="flex flex-col gap-4 mt-4">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                    id="surname"
                    label="Фамилия"
                    v-model="registration.surname"/>
                    <Input
                    id="name"
                    label="Имя"
                    v-model="registration.name"/>
                    <Input
                    id="patronymic"
                    label="Отчество"
                    v-model="registration.patronymic"/>
                </div>
                <div class="flex flex-wrap sm:flex-nowrap gap-4">
                    <Input
                    id="date_of_birth"
                    label="Дата рождения"
                    v-model="registration.birthDate"
                    class="w-full sm:w-2/4"/>
                    <Input label="Пол"
                    v-model="gender"
                    class="w-full sm:w-[20%]"/>
                    <Input
                    id="extradition"
                    class="w-full sm:w-[30%]"
                    label="Кем выдан"
                    v-model="registration.docAuthority"/>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                    id="pinfl"
                    label="Пин ФЛ"
                    v-model="registration.pinfl"/>
                    <Input
                    id="installment"
                    label="В рассрочку"
                    v-model="installment"/>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                    id="localityType"
                    label="Населенный пункт"
                    v-model="localityType"/>
                    <Input
                    id="region"
                    label="Область"
                    v-model="registration.regionName"/>
                </div>
                <Input
                id="city"
                class="w-full sm:w-1/2"
                v-model="registration.city"/>
                <div class="w-full sm:w-2/3 flex flex-wrap sm:flex-nowrap gap-4">
                    <Input
                    id="street"
                    class="w-full sm:w-3/5"
                    label="Улица"
                    v-model="registration.streetAddress"/>
                    <Input
                    id="house"
                    class="w-full sm:w-1/5"
                    label="Дом"
                    v-model="registration.houseNo"/>
                    <Input
                    id="flat"
                    class="w-full sm:w-1/5"
                    label="Кв."
                    v-model="registration.apartmentNumber"/>
                </div>
            </div>
            <Button class="min-w-[100px] mt-8" @click="printout" :isDisable="isDisablePrintOut">
                <img class="mx-auto" src="@/assets/img/print.svg" alt="Print Icon">
            </Button>
        </div>
        <p v-else
        class="text-center text-xl">
            Загрузка...
        </p>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import downloadDoc from '@/plugins/downloadDoc'
import Header from '@/components/ui/header.vue'
import Input from '@/components/ui/inputs/disable.vue'
import Title from '@/components/ui/titles/lg-semibold.vue'
import Button from '@/components/ui/buttons/rounded.vue'
export default {
    name: 'RegistartionsAbonentReadComponent',
    components: {
        Header,
        Input,
        Title,
        Button
    },
    data() {
        return {
            isDisablePrintOut: false
        }
    },
    computed: {
        ...mapState({
            registration: state => state.data,
            scan: state => state.scan,
            alert: state => state.Alert.alert,
        }),
        docType() {
            let docType
            switch (this.registration.docType) {
                case 1:
                    docType = 'Паспорт'
                    break;
                case 2:
                    docType = 'Водительские права'
                    break;
                case 3:
                    docType = 'Военный билет'
                    break;
                case 4:
                    docType = 'Паспорт иностранного гражданина'
                    break;
                default:
                    docType = 'ID карта'
                    break;
            }
            return docType
        },
        gender() {
            let gender
            switch (this.registration.gender) {
                case 'M':
                    gender = 'Мужской'
                    break;
                default:
                    gender = 'Женский'
                    break;
            }
            return gender
        },
        localityType() {
            let localityType
            switch(this.registration.localityType) {
                case 1:
                    localityType = 'Город'
                    break;
                case 2:
                    localityType = 'Поселок'
                    break;
                default:
                    localityType = 'Район'
                    break;
            }
            return localityType
        },
        installment() {
            if(this.registration.isPartialPayment) {
                return 'Да'
            } else return 'Нет'
        }
    },
    methods: {
        ...mapActions({
            get_page: 'get_pagedata',
            post_scan: 'post_scan'
        }),
        async get_registration() {
            let payload = {
                    request: `registrations/${this.$route.params.id}`,
                    key: 'data',
                    body: {}
                }
                await this.get_page(payload)
        },
        async printout() {
            if(!this.isDisablePrintOut) {
                this.isDisablePrintOut = true
                let payload = {
                    request: `registrations/regenerate-application-pdf/${this.$route.params.id}`,
                    body: this.registration,
                    headers: {
                        'responseType': 'blob'
                    },
                }
                await this.post_scan(payload)
                if(this.alert.type == 'success') {
                    this.isDisablePrintOut = false
                    downloadDoc(this.scan, 'registration.pdf');
                } else {
                    console.log('Ошибка во время распечатки скана');
                }
            }
        },
    },
    mounted() {
        this.get_registration() 
    }
}
</script>