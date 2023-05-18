<template>
    <div v-if="page">
        <p class="font-medium cursor-pointer"
        @click="$router.push('/registries')">
            Назад
        </p>
        <p class="my-4">
            <span class="font-semibold">Карточка реестра:</span> {{page.registryNumber}}
        </p>
        <div class="flex flex-col gap-4">
            <div class="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Input
                label="Название"
                v-model="page.registryNumber"
                />
                <Input
                label="Номер"
                v-model="page.id"
                />
                <Input
                label="Кол-во договоров"
                v-model="page.applicationsCount"
                />
            </div>
            <div class="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                label="Статус"
                v-model="page.registryStatus"
                />
                <Input
                label="Дата создания"
                v-model="page.createdAt"
                />
            </div>
            <div class="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-end gap-6">
                <Input
                label="Состояние"
                v-model="page.registryType"
                />
                <Button v-if="page.registryStatusId == 1" class="h-[44px]"
                @click="closeRegistr">
                    Сформировать
                </Button>
                <Button v-if="page.registryStatusId == 2" class="h-[44px]"
                @click="sendRegistr">
                    Передать в компанию
                </Button>
            </div>
            <Button class="w-[100px]" @click="printout">
                <img class="mx-auto" src="@/assets/img/print.svg" alt="Print Icon">
            </Button>
        </div>
        <h1 class="my-4 font-medium text-xl">
            Состав реестра
        </h1>
        <Pagination :active="paginationList[0].priceplan" :list="paginationList" class="mr-auto mb-2"
         @pagination="changePagination" :totalAmounts="statistics.totalElements"/>
        <div v-if="page.registryTypeId == 1" class="shadow text-center text-xs overflow-auto lg:overflow-visible">
            <div class="flex gap-2 bg-[#ececff] p-2">
                <div class="min-w-[80px] w-[10%]">
                    №
                </div>
                <div class="min-w-[130px] w-[15%]">
                    Номер
                </div>
                <div  class="min-w-[100px] w-[10%]">
                    Имя
                </div>
                <div  class="min-w-[100px] w-[10%]">
                    Фамилия
                </div>
                <div  class="min-w-[100px] w-[10%]">
                    Отчество
                </div>
                <div  class="min-w-[100px] w-[15%]">
                    Тариф
                </div>
                <div class="min-w-[130px] w-[15%]">
                    Статус
                </div>
                <div class="min-w-[150px] w-[15%]">
                    Дата
                </div>
            </div>
            <div v-for="item in statistics.content" :key="item.id" class="flex gap-2 border-b border-1 border-gray p-2">
                <div class="min-w-[80px] w-[10%]">
                    {{item.id}}
                </div>
                <div class="min-w-[130px] w-[15%]">
                    {{item.phoneNumber}}
                </div>
                <div  class="min-w-[100px] w-[10%]">
                    {{item.name}}
                </div>
                <div  class="min-w-[100px] w-[10%]">
                    {{item.surname}}
                </div>
                <div  class="min-w-[100px] w-[10%]">
                    {{item.middleName}}
                </div>
                <div class="min-w-[100px] w-[15%]">
                    {{item.priceplan}}
                </div>
                <div class="min-w-[130px] w-[15%]">
                    {{item.statusMessage}}
                </div>
                <div class="min-w-[150px] w-[15%]">
                    {{item.createdAt}}
                </div>
            </div>
        </div>
        <div v-else class="shadow text-center text-xs overflow-auto">
           <div class="flex gap-2 bg-[#ececff] p-2">
                <div class="min-w-[80px] w-[10%]">
                    №
                </div>
                <div class="min-w-[130px] w-[10%]">
                    Номер
                </div>
                <div  class="min-w-[140px] w-1/5">
                    Имси
                </div>
                <div  class="min-w-[100px] w-[10%]">
                    BAN
                </div>
                <div  class="min-w-[170px] w-1/5">
                    Карточка реестра
                </div>
                <div  class="min-w-[80px] w-[10%]">
                    Цена
                </div>
                <div class="min-w-[120px] w-[10%]">
                    Статус
                </div>
                <div class="min-w-[150px] w-[10%]">
                    Дата
                </div>
            </div>
            <div v-for="item in statistics.content" :key="item.id" class="flex gap-2 border-b border-1 border-gray p-2">
                <div class="min-w-[80px] w-[10%]">
                    {{item.id}}
                </div>
                <div class="min-w-[130px] w-[10%]">
                    {{item.phoneNumber}}
                </div>
                <div  class="min-w-[140px] w-1/5">
                    {{item.imsi}}
                </div>
                <div  class="min-w-[100px] w-[10%]">
                    {{item.ban}}
                </div>
                <div  class="min-w-[170px] w-1/5">
                    {{item.registryNumber}}
                </div>
                <div class="min-w-[80px] w-[10%]">
                    {{item.price}}
                </div>
                <div class="min-w-[120px] w-[10%]">
                    {{item.status}}
                </div>
                <div class="min-w-[150px] w-[10%]">
                    {{item.createdAt}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/ui/pagination.vue'
import {mapState, mapActions} from 'vuex'
import Button from '@/components/ui/buttons/rounded.vue'
import Input from './input.vue'
export default {
    name: 'RegistriesIdComponent',
    components: {
        Input, Button, Pagination
    },
    data() {
        return {
            paginationList: [
                {
                    id: 1,
                    technicalPriceplan: '20',
                    priceplan: '20'
                },
                {
                    id: 1,
                    technicalPriceplan: '45',
                    priceplan: '40'
                },
                {
                    id: 1,
                    technicalPriceplan: '60',
                    priceplan: '60'
                },
                {
                    id: 1,
                    technicalPriceplan: '100',
                    priceplan: '100'
                },
            ],
            activePaginationList: '20'
        }
    },
    computed: {
        ...mapState({
            page: state => state.page,
            statistics: state => state.statistics,
            scan: state => state.scan,
            alert: state => state.Alert.alert
        })
    },
    methods: {
        ...mapActions({
            get_page: 'get_pagedata',
            put_request: 'put_request',
            post_request: 'post_request',
            post_scan: 'post_scan'
        }),
        async get_registr() {
            let payload = {
                request: `/registries/${this.$route.params.id}`,
                key: 'page',
                body: {}
            }
            await this.get_page(payload)
            let statistics = {
                    request: `${this.page.registryTypeId == 2 ? 'change-sim' : 'registrations'}?page=0&size=${this.activePaginationList}&search=registryId:${this.$route.params.id}`,
                    key: 'statistics',
                    body: []
                }
            await this.get_page(statistics)
        },
        async changePagination(e) {
            this.activePaginationList = e
            let statistics = {
                    request: `registrations?page=0&size=${this.activePaginationList}&search=registryId:${this.$route.params.id}`,
                    key: 'statistics',
                    body: []
                }
            await this.get_page(statistics)
        },
        async closeRegistr() {
            let payload = {
                request: `registries/close/${this.$route.params.id}`,
                body: {},
                key: 'page'
            }
            await this.put_request(payload)
            this.get_registr()
        },
        async sendRegistr() {
            let payload = {
                request: `registries/send/${this.$route.params.id}`,
                body: {},
                key: 'page'
            }
            await this.put_request(payload)
            this.get_registr()
        },
        async printout() {
            let request
            if(this.page.registryTypeId == 1) {
                request = `registries/generate-registration-pdf/${this.page.id}`
            } else request = `registries/generate-replace-sim-pdf/${this.page.id}`
            let payload = {
                request: request,
                headers: {
                    'responseType': 'blob'
                },
            }
            await this.post_scan(payload)
            if(this.alert.type == 'success') {
                let test = document.createElement('a');
                test.href = this.scan
                test.setAttribute('download', 'application.pdf');
                document.body.appendChild(test);
                test.click()
                this.get_registr()
            }
            
        },
    },
    mounted() {
        this.get_registr()
    }
}
</script>