<template>
    <div>
        <Header title="Страница реестров регистраций"/>
        <Tabs/>
        <div v-if="statistics">
            <Pagination :active="paginationList[0].priceplan" :list="paginationList" class="mr-auto mt-2"
            @pagination="changePagination" :totalAmounts="statistics.totalElements"/>
            <div class="mt-4 text-center text-xs overflow-auto">
                <div class="py-2 border-y-[1px] border-[#EDF2F7]">
                    <div class="flex gap-2 py-5">
                        <HeaderText class="min-w-[80px] w-[5%]">
                            №
                        </HeaderText>
                        <HeaderText class="min-w-[244px] w-[30%]">
                            Номер
                        </HeaderText>
                        <HeaderText  class="min-w-[192px] w-[20%]">
                            Статус
                        </HeaderText>
                        <HeaderText class="min-w-[176px] w-[10%]">
                            Кол-во договоров
                        </HeaderText>
                        <HeaderText class="min-w-[176px] w-[30%]">
                            Дата
                        </HeaderText>
                        <div class="min-w-[80px] w-[5%]"/>
                    </div>
                    <div class="flex gap-2 items-center w-full gap-2">
                        <input type="text" class="input min-w-[80px] w-[5%]" v-model="filtr.id"
                        @input="filterId">
                        <input type="text" class="input min-w-[244px] w-[30%]" v-model="filtr.registryNumber">
                        <select @change="((e) => filtr.registryStatus = e.target.value)" class="input min-w-[192px] w-[20%]">
                            <option selected/>
                            <option v-for="item in statuses" :key="item.id" :value="item.id">{{item.name}}</option>
                        </select>
                        <div class="min-w-[176px] w-[10%]"/>
                        <p class="text-[10px] input pt-0.5 min-w-[176px] w-[30%] bg-white cursor-pointer"
                        @click="changeDate">
                            {{calendarText}}
                        </p>
                        <div class="min-w-[80px] w-[5%]">
                            <svg fill="none" stroke="#F7BE00" width="24" height="24" class="mx-auto cursor-pointer"
                            @click="changeStatisticsList">
                                <use xlink:href="#filtr"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-for="item in statistics.content" :key="item.id" class="flex gap-2 border-b-[1px] border-[#EDF2F7] py-[30px] cursor-pointer"
                 @click="getSingleRegistration(item.id)">
                    <BoldText class="min-w-[80px] w-[5%]">
                        {{item.id}}
                    </BoldText>
                    <Text class="min-w-[244px] w-[30%]">
                        {{item.registryNumber}}
                    </Text>
                    <Text  class="min-w-[192px] w-[20%]">
                        {{item.registryStatus}}
                    </Text>
                    <Text class="min-w-[176px] w-[10%]">
                        {{item.applicationsCount}}
                    </Text>
                    <Text class="min-w-[176px] w-[30%]">
                        {{item.createdAt}}
                    </Text>
                    <p class="min-w-[80px] w-[5%] font-semibold text-[18px] text-dim-yellow">
                        >
                    </p>
                </div>
            </div>
            <PagePagination
            v-if="statistics.totalPages > 1"
            :pagination="statistics" 
            @changePage="changePage" 
            @nextPage="nextPage"
            @previousPage="previousPage"/>
        </div>
        <Transition>
            <Calendar v-if="isCalendar" @changePeriod="changePeriod"/>
        </Transition>
    </div>
</template>
<script>
import Tabs from './tabs.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
import Pagination from '@/components/ui/pagination.vue'
import Calendar from '@/components/ui/application/calendar/index.vue'
import clearSymbols from '@/plugins/clearSymbols'
import Header from '@/components/ui/header.vue'
import HeaderText from '@/components/ui/texts/ExtraBold-Vgray-Base.vue'
import BoldText from '@/components/ui/texts/ExtraBold-Vblack-Base.vue'
import Text from '@/components/ui/texts/Semibold-Vblack-Base.vue'
import PagePagination from '@/components/ui/pagePagination.vue'
export default {
    name: 'RegistriesComponent',
    components: {
        Tabs, 
        Pagination, 
        Calendar,
        Header,
        HeaderText,
        BoldText,
        Text,
        PagePagination
    },
    computed: {
        ...mapState({
            statistics: state => state.page,
            isCalendar: state => state.Calendar.isCalendar,
            // statistics: state => state.statistics,
            statuses: state => state.statistics,
        })
    },
    data() {
        return {
            paginationList: [
                {
                    id: 1,
                    technicalPriceplan: '10',
                    priceplan: '10'
                },
                {
                    id: 1,
                    technicalPriceplan: '25',
                    priceplan: '25'
                },
                {
                    id: 1,
                    technicalPriceplan: '50',
                    priceplan: '50'
                },
                {
                    id: 1,
                    technicalPriceplan: '100',
                    priceplan: '100'
                },
            ],
            filtr:  {
                id: '',
                registryNumber: '',
                registryStatus: '',
                createdAt: ['','']
            },
            activePaginationList: '10',
            calendarText: 'Щелкните чтобы выбрать дату',
            page: '0'
        }
    },
    methods: {
        ...mapMutations({
            change_calendar: 'Calendar/CHANGE_CALENDAR'
        }),
        ...mapActions({
            get_page: 'get_pagedata'
        }),
        async get_statistics() {
            let payload = {
                request: `registries?page=${this.page}&size=${this.activePaginationList}&registryTypeId=1`,
                key: 'page',
                body: []
            }
            await this.get_page(payload)
        },
        filterId() {
            this.filtr.id = clearSymbols(this.filtr.id)
        },
        changeDate() {
            this.change_calendar(true)
        },
        changePeriod(e) {
            this.filtr.createdAt = e
            this.calendarText = `${this.filtr.createdAt[0]} - ${this.filtr.createdAt[1]}`
            this.change_calendar(false)
        },
        async get_statuses() {
            let payload = {
                request: 'registries/statuses',
                key: 'statistics',
                body: []
            }
            await this.get_page(payload)
        },
        async changeStatisticsList() {
            let dateFrom
            let dateTo
            if(this.filtr.createdAt[0].length > 0 && this.filtr.createdAt[1].length > 0) {
                dateFrom = this.filtr.createdAt[0]
                dateFrom = dateFrom.replaceAll('-', '')
                dateTo = this.filtr.createdAt[1]
                dateTo = dateTo.replaceAll('-', '')
            }
            let payload = {
                request: `registries?page=${this.page}&size=${this.activePaginationList}&registryTypeId=1&${this.filtr.id.length > 0 ? `id=${this.filtr.id}` : ''}${this.filtr.registryNumber.length > 0 ? `registryNumber=${this.filtr.registryNumber}&` : ''}${this.filtr.registryStatus.length > 0 ? `registryStatusId=${this.filtr.registryStatus}&` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
                key: 'page',
                body: []
            }
            await this.get_page(payload)
        },
        async changePagination(e) {
            this.activePaginationList = e
            let dateFrom
            let dateTo
            if(this.filtr.createdAt[0].length > 0 && this.filtr.createdAt[1].length > 0) {
                dateFrom = this.filtr.createdAt[0]
                dateFrom = dateFrom.replaceAll('-', '')
                dateTo = this.filtr.createdAt[1]
                dateTo = dateTo.replaceAll('-', '')
            }
            let payload = {
                key: 'page',
                request: `registries?page=${this.page}&size=${this.activePaginationList}&registryTypeId=1&${this.filtr.id.length > 0 ? `id=${this.filtr.id}` : ''}${this.filtr.registryNumber.length > 0 ? `registryNumber=${this.filtr.registryNumber}&` : ''}${this.filtr.registryStatus.length > 0 ? `registryStatusId=${this.filtr.registryStatus}&` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
                body: []
            }
            await this.get_page(payload)
        },
        getSingleRegistration(e) {
            this.$router.push(`/registries/${e}`)
        },
        changePage(e) {
            this.page = e - 1
            this.changeStatisticsList()
        },
        nextPage() {
            this.page = this.statistics.number + 1
            this.changeStatisticsList()
        },
        previousPage() {
            this.page = this.statistics.number - 1
            this.changeStatisticsList()
        }
    },
    mounted() {
        this.get_statistics()
        this.get_statuses()
    }
}
</script>
<style scoped>
.input {
    padding-left: 16px;
    padding-right: 16px;
    height: 25px;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    outline-width: 0px;
}
</style>