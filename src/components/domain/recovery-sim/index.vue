<template>
    <Header title="Восстановление SIM"/>
    <div class="flex flex-col md:flex-row gap-8">
        <!-- <div class="w-full sm:w-1/2 flex flex-col mx-auto gap-4">
            <File @sendFile="filterpassportScan" 
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
        <div class="w-full md:w-1/2 flex flex-col justify-between gap-4">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-2 gap-6">
                    <Input
                    id="name"
                    type="extraditionSIM"
                    label="Имя"
                    v-model="info.name"
                    @update:modelValue="filterName"/>
                    <Input
                    id="surname"
                    type="extraditionSIM"
                    label="Фамилия"
                    v-model="info.surname"
                    @update:modelValue="filterSurname"/>
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <Input
                    id="patronymic"
                    type="extraditionSIM"
                    label="Отчество"
                    v-model="info.patronymic"
                    @update:modelValue="filterPatronymic"/>
                    <Date
                    id="date_of_birth"
                    label="Дата рождения"
                    placeholder="DD-MM-YYYY"
                    v-model="info.birthDate"
                    maxlength="10"
                    @update:modelValue="changeBirthDate($event)"/>
                </div>
                <div class="flex flex-col sm:flex-row gap-2 sm:gap-8">
                    <Input
                    id="seiresPassport"
                    label="Серия паспорта"
                    class="w-full sm:w-2/5"
                    maxlength="2"
                    v-model="info.passportSerial"
                    @update:modelValue="filterSeries"/>
                    <Input
                    id="numberPassport"
                    label="Номер паспорта"
                    maxlength="7"
                    class="w-full sm:w-3/5"
                    v-model="info.passportNumber"
                    @update:modelValue="filterPassportNumber"/>
                </div>
                <div class="flex flex-col sm:flex-row gap-2 sm:gap-8">
                    <Input
                    id="simNumber   "
                    label="Номер SIM"
                    class="w-full sm:w-1/2"
                    v-model="info.imsi"
                    maxlength="18"
                    @update:modelValue="filterImsi"/>
                    <Input
                    id="phone"
                    label="Номер телефона"
                    class="w-full sm:w-1/2"
                    v-model="info.phoneNumber"
                    :maxlength="maxlengthPhone"
                    @update:modelValue="filterPhoneNumber"/>
                </div>
                <div class="flex flex-col gap-2">
                    <label>Причина</label>
                    <select @change="filterReason"
                    class="w-full sm:w-1/2 select p-4 rounded-xl border-[1px] border-[#E2E8F0] focus:border-[#194BFB] outline-0">
                        <option selected hidden/>
                        <option v-for="item in list" :key="item.id" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-between">
                <Button class="w-[100px]" :isDisable="isScan" @click="printout">
                    <img class="mx-auto" src="@/assets/img/print.svg" alt="Print Icon">
                </Button>
                <div class="w-1/2">
                    <Button :isDisable="isSend" @click="send">
                        Подтвердить
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import File from '@/components/ui/inputs/file.vue'
import Input from '@/components/ui/inputs/default.vue'
import Button from '@/components/ui/buttons/rounded.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
import clearNumbers from '@/plugins/clearNumbers'
import clearSymbols from '@/plugins/clearSymbols'
import clearSpecSymbols from '@/plugins/clearSpecSymbols'
import Header from '@/components/ui/header.vue'
import Date from '@/components/ui/inputs/date.vue'
export default {
    name: 'Recovery-simComponent',
    components: {
        // File, 
        Input, Button,
        Header,
        Date
    },
    computed: {
        ...mapState({
            page: state => state.page,
            scan: state => state.scan,
            alert: state => state.Alert.alert
        })
    },
    data() {
        return {
            info: {
                name: '',
                surname: '',
                patronymic: '',
                birthDate: '',
                imsi: '',
                phoneNumber: '',
                passportSerial: '',
                passportNumber: '',
                reasonId: '',
                // passport_scan: null,
                // passport_back_scan: null,
                // dogovor_scan: null,
            },
            isScan: true,
            isSend: true,
            list: [
                {
                    id: 1,
                    name: 'Утеря/кража'
                },
                {
                    id: 2,
                    name: 'Неисправность'
                }
            ],
            isSuccess: false,
            isStatus: false,
            maxlengthPhone: 12
        }
    },
    methods: {
        ...mapMutations({
            change_alert: 'Alert/CHANGE_ALERT',
            clear_alert: 'Alert/CLEAR_ALERT'
        }),
        ...mapActions({
            get_page: 'get_pagedata',
            post_request: 'post_request',
            post_scan: 'post_scan'
        }),
        filterSeries() {
            this.info.passportSerial = this.info.passportSerial.toUpperCase()
            this.info.passportSerial = clearNumbers(this.info.passportSerial)
            this.info.passportSerial = clearSpecSymbols(this.info.passportSerial)   
            this.filterScan()
            this.filterSend()
        },
        filterPassportNumber() {
            this.info.passportNumber = clearSymbols(this.info.passportNumber)
            this.filterScan()
            this.filterSend()
        },
        filterPhoneNumber() {
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
            this.filterScan()
            this.filterSend()
        },
        filterpassportScan(e) {
            this.info.passport_scan = e
            this.filterSend()
        },
        filterPassportBackScan(e) {
            this.info.passport_back_scan = e
            this.filterSend()
        },
        filterDogovorScan(e) {
            this.info.dogovor_scan = e
            this.filterSend()
        },
        filterReason(e) {
            this.info.reasonId = e.target.value
            this.filterScan()
            this.filterSend()
        },
        filterName() {
            this.filterScan()
        },
        filterSurname() {
            this.filterScan()
        },
        filterPatronymic() {
            this.filterScan()
        },
        changeBirthDate(e) {
            this.info.birthDate = e
            this.filterScan()
        },
        async filterImsi() {
            this.info.imsi = clearSymbols(this.info.imsi)
            this.filterScan()
            this.filterSend()
            if(this.info.imsi.length == 18) {
                let payload = {
                    request: `change-sim/find-by-serial-number?serialNumber=${this.info.imsi}`,
                    key: 'page',
                    body: {}
                }
                await this.get_page(payload)
            }
        },
        filterScan() {
            if(this.info.name.length > 0 && this.info.surname.length > 0 && this.info.patronymic.length > 0 && this.info.birthDate.length > 0 && this.info.reasonId.length > 0 && this.info.passportSerial.length == 2 && this.info.passportNumber.length == 7 && this.info.imsi.length == 18 && this.info.phoneNumber.length == 12) {
                this.isScan = false
                this.isStatus = false
            } else {
                this.isSuccess = false
                this.isScan = true
            }
        },
        async printout() {
            if(!this.isScan) {
                let payload = {
                    request: 'change-sim/generate-pdf',
                    body: this.info,
                    headers: {
                        'responseType': 'blob'
                    }
                }
                await this.post_scan(payload)
                if(this.alert.type == 'success') {
                    this.isSuccess = true
                    this.isStatus = true
                    this.isScan = true
                    this.filterSend()
                    let test = document.createElement('a');
                    test.href = this.scan
                    test.setAttribute('download', 'application.pdf');
                    document.body.appendChild(test);
                    test.click()
                } else {
                    this.isScan = false
                    console.log('Ошибка во время распечатки скана');
                }
            }
        },
        filterSend() {
            // if(this.isStatus && this.isSuccess && this.info.passport_scan !== null && this.info.passport_back_scan !== null && this.info.dogovor_scan !== null) {
            //     this.isSend = false
            // } else {
            //     this.isSend = true
            // }
            if(this.isStatus && this.isSuccess) {
                this.isSend = false
            } else {
                this.isSend = true
            }
        },
        async send() {
            if(!this.isSend) {
                let payload = {
                    request: 'change-sim/change',
                    body: this.info,
                    // body: {
                    //    imsi: this.info.imsi,
                    //    phoneNumber: this.info.phoneNumber,
                    //    passportSerial: this.info.passportSerial,
                    //    passportNumber: this.info.passportNumber,
                    //    reasonId: this.info.reasonId,
                    //    file: [
                    //     this.info.passport_scan,
                    //     this.info.passport_back_scan,
                    //     this.info.dogovor_scan
                    //    ]
                    // },
                    headers: {
                        headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    }
                }
                await this.post_request(payload)
                if(this.alert.type == 'success') {
                    window.location.reload()
                }
            } 
        }
    }
}
</script>
<style scoped>
.select {
    -webkit-appearance: none;
    background: url('@/assets/img/arrow-down.png') 95% 50% no-repeat;
}
</style>