<template>
    <div>
        <router-link to="/statistics">
            Назад
        </router-link>
        <div v-if="page" class="w-3/5 flex flex-col gap-4 mt-4">
            <div class="grid grid-cols-2 gap-4">
                <Input
                :disabled="true"
                label="Номер телефона"
                v-model="page.phoneNumber"/>
                <Input
                :disabled="true"
                label="ПИН ФЛ"
                v-model="page.pinFL"/>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <Input
                :disabled="true"
                label="Фамилия"
                v-model="page.surname"/>
                <Input
                :disabled="true"
                label="Имя"
                v-model="page.name"/>
                <Input
                :disabled="true"
                label="Отчество"
                v-model="page.patronymic"/>
            </div>
            <div class="grid grid-cols-5 gap-4">
                <Input
                :disabled="true"
                label="Код страны"
                v-model="page.countryCode"/>
                <Input
                :disabled="true"
                label="Город"
                v-model="page.city"/>
                <Input
                :disabled="true"
                label="Улица"
                v-model="page.streetAddress"/>
                <Input
                :disabled="true"
                label="Дом"
                v-model="page.houseNo"/>
                <Input
                :disabled="true"
                label="Кв."
                v-model="page.apartmentNumber"/>
            </div>
            <div class="grid grid-cols-4 gap-4">
                <Input
                :disabled="true"
                label="Серия паспорта"
                v-model="page.passportSerial"/>
                <Input
                :disabled="true"
                label="Номер паспорта"
                v-model="page.passportNumber"/>
                <Input
                :disabled="true"
                label="Дата выдачи"
                v-model="page.docIssue"/>
                <Input
                :disabled="true"
                label="Место выдачи"
                v-model="page.docAuthority"/>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <Input
                :disabled="true"
                label="Пол"
                v-model="page.gender"/>
                <Input
                :disabled="true"
                label="Тариф"
                v-model="page.priceplan"/>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Input from '@/components/ui/inputs/default.vue'
export default {
    name: 'SingleStatisticsComponent',
    computed: {
        ...mapState({
            page: state => state.page
        })
    },
    components: {
        Input
    },
    methods: {
        ...mapActions({
            get_page: 'get_pagedata'
        }),
        async get_statistics() {
            let payload = {
                request: `registrations/${this.$route.params.id}`,
                key: 'page',
                body: {}
            }
            await this.get_page(payload)
        }
    },
    mounted() {
        this.get_statistics()
    }
}
</script>