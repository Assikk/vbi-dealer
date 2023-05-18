<template>
    <Header title="Страница услуг"/>
    <div>
        <div>
            <p class="text-[#777] mb-4">
                Подключенные услуги
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="item in services.connected" :key="item.serviceId" class="flex flex-col gap-6 shadow p-5">
                    <div class="flex flex-col gap-2">
                        <p class="text-xl text-[#333]">
                            {{item.serviceName}}
                        </p>
                        <p class="text-sm text-[#777]" v-if="item.description">
                            {{item.description}}
                        </p>
                    </div>
                    <ButtonOutline v-if="item.selfShutdown" 
                    @click="deactivateService(item)">
                        Отключить услугу
                    </ButtonOutline>
                    <a :href="item.url" target="_blank" class="underline text-[#2d9cdb] text-center">
                        Узнать подробнее об услуге
                    </a>
                </div>
            </div>
        </div>
        <div class="mt-12">
            <p class="text-[#777] text-xl">
                Доступные услуги
            </p>
            <div class="my-8" v-for="(service, index) in services.available" :key="index">
                <div v-if="service.services.length > 0">
                    <div class="flex items-center justify-between gap-2 cursor-pointer"
                    @click="showServices(service)">
                        <h3 class="text-[#777] mb-2.5">
                            {{service.serviceTypeName}}
                        </h3>
                        <svg fill="none" stroke="#718096" width="24" height="24"
                        :class="isShowServices == service.serviceTypeName ? 'rotate-180' : ''">
                            <use xlink:href="#arrowDown"/>
                        </svg>
                    </div>
                    <Transition>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                        v-if="isShowServices == service.serviceTypeName">
                            <div v-for="item in service.services" :key="item.serviceId" 
                            class="shadow p-5 flex flex-col gap-6">
                                <p class="text-[#333] text-xl">
                                    {{item.serviceName}}
                                </p>
                                <p class="text-sm text-[#777]">
                                    Стоимость: {{item.price}} Сум
                                </p>
                                <p class="text-sm text-[#777]">
                                    Пороговая стоимость: {{item.priceWithThreshold}} Сум
                                </p>
                                <p class="text-sm text-[#777]" v-if="item.description">
                                    {{item.description}}
                                </p>
                                <ButtonPrimary @click="activateService(item)">
                                    Подключить услугу
                                </ButtonPrimary>
                                <a :href="item.url" target="_blank" class="underline text-[#2d9cdb] text-center">
                                    Узнать подробнее об услуге
                                </a>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Header from '@/components/ui/header.vue'
import ButtonOutline from '@/components/ui/buttons/outline.vue'
import ButtonPrimary from '@/components/ui/buttons/primary.vue'
export default {
    name: 'User-ServicesComponent',
    components: {
        ButtonOutline, ButtonPrimary,
        Header
    },
    computed :{
        ...mapState({
            services: state => state.services,
            alert: state => state.Alert.alert
        }),
        abonentNumber() {
            return window.localStorage.getItem('abonentNumber') 
        }
    },
    data() {
        return {
            isShowServices: null
        }
    },
    methods: {
        ...mapMutations({
            change_state: 'CHANGE_STATE',
            show_isConfirmation: 'SMSconfirmation/CHANGE_CONFIRMATION',
        }),
        ...mapActions({
            get_page: 'get_pagedata',
            post_request: 'post_request'
        }),
        async get_services() {
            let payload = {
                request: `subscriber-info/services/${this.abonentNumber}`,
                key: 'services',
                body: []
            }
            await this.get_page(payload)
        },
        async deactivateService(e) {
            let payload = {
                request: 'operate-service/deactivate/start',
                body: {
                    serviceId: e.serviceId,
                    phoneNumber: this.abonentNumber
                }
            }
            await this.post_request(payload)
            if(this.alert.type == 'success') {
                let payload = {
                    key: 'sms',
                    body: {
                        request: 'operate-service/deactivate/finish',
                        body: this.alert.msg
                    }
                }
                this.change_state(payload)
                let alert = {
                    key: 'abonent',
                    body: {
                        phoneNumber: localStorage.getItem('abonentNumber'),
                        code: ''
                    }
                }
                this.change_state(alert)
                this.show_isConfirmation(true)
            }
        },
        async activateService(e) {
            let payload = {
                request: 'operate-service/activate/start',
                body: {
                    serviceId: e.serviceId,
                    phoneNumber: this.abonentNumber
                }
            }
            await this.post_request(payload)
            if(this.alert.type == 'success') {
                let payload = {
                    key: 'sms',
                    body: {
                        request: 'operate-service/activate/finish',
                        body: this.alert.msg
                    }
                }
                this.change_state(payload)
                let alert = {
                    key: 'abonent',
                    body: {
                        phoneNumber: localStorage.getItem('abonentNumber'),
                        code: ''
                    }
                }
                this.change_state(alert)
                this.show_isConfirmation(true)
            }
        },
        showServices(e) {
            if(this.isShowServices == null) {
                this.isShowServices = e.serviceTypeName
            } else this.isShowServices = null
        }
    },
    mounted() {
        this.get_services()
    }
}
</script>
<style scoped>
    .shadow {
        box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    }
</style>