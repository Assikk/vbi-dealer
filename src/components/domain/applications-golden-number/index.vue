<template>
    <Header title="Golden Number"/>
    <div class="w-[90%] sm:w-3/5 mx-auto rounded shadow p-5">
        <Title class="text-center">
            Авторизация абонента
        </Title>
        <div class="my-12 flex flex-col items-center">
            <div class="flex flex-col gap-4 w-full sm:w-auto">
                <div class="flex flex-col gap-1">
                    <p class="text-center font-semibold text-sm">
                        Номер заказа
                    </p>
                    <Input
                    id="number"
                    placeholder="Номер заказа"
                    class="w-full sm:w-[300px]"
                    :class="errorOrderNumber ? '' : 'border-[1px] border-vbi-red'"
                    v-model="form.orderNumber"
                    @update:modelValue="filterOrderNumber"/>
                </div>
                <div class="flex flex-col gap-1">
                    <p class="text-center font-semibold text-sm">
                        Забронированный номер
                    </p>
                    <Input
                    id="reservedNumber"
                    placeholder="998000000000"
                    class="w-full sm:w-[300px]"
                    :class="errorNewPhoneNumber ? '' : 'border-[1px] border-vbi-red'"
                    v-model="form.newPhoneNumber"
                    :maxlength="maxlengthNewPhone"
                    @update:modelValue="filterNewPhoneNumber"/>
                </div>
                <div class="flex flex-col gap-1">
                    <p class="text-center font-semibold text-sm">
                        Серия и номер паспорта
                    </p>
                    <Input
                    id="passport"
                    placeholder="AA0000000"
                    class="w-full sm:w-[300px]"
                    :class="errorPassport ? '' : 'border-[1px] border-vbi-red'"
                    v-model="form.passport"
                    maxlength="9"
                    @update:modelValue="filterPassport"/>
                </div>
                <div v-if="isSuccess" class="flex flex-col gap-1">
                    <p class="text-center font-semibold text-sm">
                        Город
                    </p>
                    <Input
                    id="city"
                    placeholder="Выберите город"
                    class="w-full sm:w-[300px]"
                    v-model="form.city"
                    @update:modelValue="filterCity"/>
                </div>
                <div v-if="isSuccess" class="flex flex-col gap-1">
                    <p class="text-center font-semibold text-sm">
                        Комплект для замены
                    </p>
                    <Input
                    id="oldNumber"
                    placeholder="Введите номер"
                    class="w-full sm:w-[300px]"
                    v-model="form.oldPhoneNumber"
                    @update:modelValue="filterOldPhoneNumber"
                    :maxlength="maxlengthOldPhone"/>
                </div>
                <Button @click="changeNumber" v-if="isSuccess">
                    Замена номера
                </Button>
                <Button v-else :isDisable="isButton"
                @click="check">
                    Проверить
                </Button>
            </div>
        </div>
    </div>
</template>
<script>
import Title from '../../ui/titles/2xl-1.vue'
import Input from '@/components/ui/inputs/default.vue'
import Button from '@/components/ui/buttons/primary.vue'
import clearSymbols from '@/plugins/clearSymbols'
import clearNumbers from '@/plugins/clearNumbers'
import {mapState, mapMutations, mapActions} from 'vuex'
import Header from '@/components/ui/header.vue'
export default {
    name: 'ApplicationsGoldenNumberComponent',
    components: {
        Title, 
        Input, 
        Button,
        Header
    },
    computed: {
        ...mapState({
            page: state => state.page,
            alert: state => state.Alert.alert
        }),
    },
    data() {
        return {
            form: {
                orderNumber: '',
                newPhoneNumber: '',
                passport: '',
                city: '',
                oldPhoneNumber: ''
            },
            errorOrderNumber: true,
            errorNewPhoneNumber: true,
            errorPassport: true,
            isSuccess: false,
            isButton: true,
            maxlengthNewPhone: 12,
            maxlengthOldPhone: 12
        }
    },
    methods: {
        ...mapMutations({
            change_state: 'CHANGE_STATE',
            show_isConfirmation: 'SMSconfirmation/CHANGE_CONFIRMATION'
        }),
        ...mapActions({
            post_request: 'post_request'
        }),
        filterOrderNumber() {
            this.filterNumber()
            this.form.orderNumber = clearSymbols(this.form.orderNumber)
        },
        filterNewPhoneNumber() {
            if(this.form.newPhoneNumber.length > 0) {
                if(!this.form.newPhoneNumber.startsWith('99')) {
                this.maxlengthNewPhone = 2
                } else {
                    if(!this.form.newPhoneNumber.startsWith('998')) {
                        this.maxlengthNewPhone = 3
                    } else {
                        this.maxlengthNewPhone = 12
                    }
                }
            } else this.maxlengthNewPhone = 12
            this.form.newPhoneNumber = clearSymbols(this.form.newPhoneNumber)
            this.filterNumber()
        },
        filterOldPhoneNumber() {
            if(this.form.oldPhoneNumber.length > 0) {
                if(!this.form.oldPhoneNumber.startsWith('99')) {
                this.maxlengthOldPhone = 2
                } else {
                    if(!this.form.oldPhoneNumber.startsWith('998')) {
                        this.maxlengthOldPhone = 3
                    } else {
                        this.maxlengthOldPhone = 12
                    }
                }
            } else this.maxlengthOldPhone = 12
            this.form.newPhoneNumber = clearSymbols(this.form.newPhoneNumber)
        },
        filterPassport() {
            this.filterNumber()
        },
        filterCity() {
            this.form.city = clearNumbers(this.form.city)
        },
        filterNumber() {
            if(this.form.orderNumber.length > 0 && this.form.newPhoneNumber.length > 0 && this.form.passport.length > 0) {
                this.isButton = false
            } else {
                this.isButton = true
            }
        },
        async check() {
            if(!this.isButton) {
                let payload = {
                    request: 'golden-number/info',
                    body: this.form
                }
                await this.post_request(payload)
                if(this.page.orderIdMatch) {
                    this.errorOrderNumber = true
                } else this.errorOrderNumber = false
                if(this.page.phoneIdMatch) {
                    this.errorNewPhoneNumber = true
                } else this.errorNewPhoneNumber = false
                if(this.page.passwordIdMatch) {
                    this.errorPassport = true
                } else this.errorPassport = false

                if(this.page.orderIdMatch && this.page.phoneIdMatch && this.page.passwordIdMatch) {
                    this.isSuccess = true
                    this.form.city = this.page.addressCity
                } else {
                    this.isSuccess = false
                }
            }
        },
        async changeNumber() {
            let payload = {
                request: 'golden-number/start',
                body: this.form
            }
            await this.post_request(payload)
            if(this.alert.type == 'success') {
                let payload = {
                    key: 'sms',
                    body: {
                        request: 'golden-number/finish',
                        body: this.alert.msg
                    }
                }
                this.change_state(payload)
                this.show_isConfirmation(true)
            }
        }
    }
}
</script>
<style scoped>
    .shadow {
        box-shadow: 0 0 4px rgba(0,0,0,.1);
    }
</style>