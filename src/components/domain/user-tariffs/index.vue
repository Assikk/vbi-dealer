<template>
    <Header title="Страница тарифов"/>
    <div>
        <div class="w-full sm:w-4/6">
            <p class="text-[#777] mb-4">
                Текущий тариф
            </p>
            <div v-if="tariffs.connected" class="shadow rounded flex flex-col gap-2.5 p-5">
                <p class="text-[28px]">
                    {{tariffs.connected.priceplanName}}
                </p>
                <p class="text-sm text-[#777]">
                    {{tariffs.connected.description}}
                </p>
                <a :href="tariffs.connected.url" class="underline text-[#007bff] hover:text-[#0056b3]">
                    Узнать подробнее о тарифе
                </a>
            </div>
        </div>
        <div v-if="tariffs.available" class="mt-8">
            <p class="text-[#777] mb-4">
                Остальные тарифные планы
            </p>
            <div class="grid grid-cols-3 gap-8">
                <div class="shadow p-5 flex flex-col gap-6" v-for="(item, index) in tariffs.available" :key="index">
                   <div class="flex flex-col gap-2">
                        <p class="text-2xl text-[#333]">
                            {{item.priceplanName}}
                        </p>
                        <p class="text-sm text-[#777]">
                            {{item.description}}
                        </p>
                   </div>
                   <div class="flex justify-between text-[#333] font-semibold">
                        <p>
                            Абонентская плата:
                        </p>
                        <p>
                            {{item.price}}
                        </p>
                   </div>
                   <div class="flex justify-between text-[#333] font-semibold">
                        <p>
                            Пороговая стоимость:
                        </p>
                        <p>
                            {{item.priceWithThreshold}}
                        </p>
                   </div>
                   <Button @click="changeTariff(item)">
                        Подключить тариф
                   </Button>
                   <a :href="item.url" class="underline text-[#007bff] hover:text-[#0056b3] text-center">
                    Узнать подробнеео тарифе
                   </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Header from '@/components/ui/header.vue'
import Button from '@/components/ui/buttons/primary.vue'
export default {
    name: 'User-TariffsComponent',
    components: {
        Button,
        Header
    },
    computed: {
        ...mapState({
            tariffs: state => state.statistics,
            alert: state => state.Alert.alert
        }),
        abonentNumber() {
            return window.localStorage.getItem('abonentNumber') 
        }
    },
    methods: {
        ...mapMutations({
            show_isConfirmation: 'SMSconfirmation/CHANGE_CONFIRMATION',
            change_state: 'CHANGE_STATE'
        }),
        ...mapActions({
            get_page: 'get_pagedata',
            post_request: 'post_request'
        }),
        async get_tariffs() {
            let payload = {
                request: `subscriber-info/priceplan/${this.abonentNumber}`,
                body: [],
                key: 'statistics'
            }
            await this.get_page(payload)
        },
        async changeTariff(e) {
            let payload = {
                request: 'change-priceplan/start',
                body: {
                    priceplanId: e.priceplanId,
                    phoneNumber: this.abonentNumber,
                    passportSerial: 'AA',
                    passportNumber: '1111111'
                }
            }
            await this.post_request(payload)
            if(this.alert.type == 'success') {
                let payload = {
                    key: 'sms',
                    body: {
                        request: 'change-priceplan/finish',
                        body: this.alert.msg
                    }
                }
                this.change_state(payload)
                this.show_isConfirmation(true)
            }
        }
    },
    mounted() {
        this.get_tariffs()
    }
}
</script>
<style scoped>
.shadow {
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}
</style>