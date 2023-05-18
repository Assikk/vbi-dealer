<template>
    <Header title="Страница детализации"/>
    <div class="flex flex-wrap md:flex-nowrap gap-4">
        <div class="w-full md:w-1/4">
            <p class="uppercase mb-6 text-[#ccc]">
                Показать операции
            </p>
            <div class="flex flex-col gap-4">
                <p v-for="item in operationList" :key="item.id" class="p-2.5 uppercase cursor-pointer"
                :class="activeOperationList == item.id ? 'border-l-[3px] border-[#64b414] font-semibold' : ''"
                @click="changeOperationList(item)">
                    {{item.text}}
                </p>
            </div>
        </div>
        <div class="w-full md:w-3/4">
            <p class="mb-2.5 text-[#777]">
                Общая информация по балансу
            </p>
            <div class="bg-white shadow p-6 mb-[30px]">
                <div class="flex items-center justify-between mb-6">
                    <p>
                        Пополнение:
                    </p>
                    <p class="font-semibold">
                        {{statistics.incomingValue}}
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <p>
                        Расходы:
                    </p>
                    <p class="font-semibold">
                        {{statistics.chargeValue}}
                    </p>
                </div>
            </div>
            <p class="text-[#777] mb-2.5">
                Детализация
            </p>
            <div class="bg-white shadow p-6 flex flex-col gap-[50px]">
                <div v-for="(item, index) in statistics.services" :key="index">
                    <div class="flex items-center justify-between">
                        <p>
                            {{item.serviceName}}
                        </p>
                        <div @click="clickDetail(item)" class="flex items-center gap-8 cursor-pointer">
                            <p class="font-semibold">
                                {{item.serviceCharge}}
                            </p>
                            <img src="@/assets/img/arrow-down-black.png" alt="Arrow Down Icon" class="w-4"
                            :class="isActiveDetail == item.isActive ? 'rotate-180' : ''">
                        </div>
                    </div>
                    <div v-if="isActiveDetail == item.isActive">
                        <div v-for="(detail, index) in item.serviceDetail" :key="index" class="flex flex-col items-end mt-6 border-b-[1px] border-gray">
                            <p class="text-lg font-bold">
                                {{detail.charge}} UZS
                            </p>
                            <p class="py-4 text-[#777] text-xs">
                                {{detail.dateTime}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Transition>
      <Calendar v-if="isCalendar"
      @changePeriod="changePeriod"/>
  </Transition>
</template>
<script>
import moment from 'moment'
import Header from '@/components/ui/header.vue'
import Calendar from '@/components/ui/application/calendar/index.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    name: 'UserDetailsComponent',
    components: {
        Calendar,
        Header
    },
    data() {
        return {
            activeOperationList: 1,
            operationList: [
                {
                    id: 1,
                    text: 'За сегодня',
                },
                {
                    id: 2,
                    text: 'За неделю',
                },
                {
                    id: 3,
                    text: 'За период',
                }
            ],
            isActiveDetail: null,
            dateTo: null,
            dateFrom: null
        }
    },
    computed: {
        ...mapState({
            statistics: state => state.statistics,
            isCalendar: state => state.Calendar.isCalendar,
            alert: state => state.Alert.alert
        }),
        abonentNumber() {
            return window.localStorage.getItem('abonentNumber') 
        },
        dateToday() {
            let a = moment().format('YYYY-MM-DD');
            return a 
        },
        dateWeekAgo() {
            let a = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
            return a 
        },
        request() {
            switch (this.activeOperationList) {
                case 1:
                    return `subscriber-info/detailing?subNumber=${this.abonentNumber}&dateFrom=${this.dateToday}&dateTo=${this.dateToday}`
                case 2:
                    return `subscriber-info/detailing?subNumber=${this.abonentNumber}&dateFrom=${this.dateWeekAgo}&dateTo=${this.dateToday}`
                default:
                    return `subscriber-info/detailing?subNumber=${this.abonentNumber}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}`
            }
        }
    },
    methods: {
        ...mapMutations({
            change_calendar: 'Calendar/CHANGE_CALENDAR',
            change_state: 'CHANGE_STATE',
            change_alert: 'Alert/CHANGE_ALERT',
            clear_alert: 'Alert/CLEAR_ALERT'
        }),
        ...mapActions({
            get_page: 'get_pagedata'
        }),
        async get_details() {
            let val = {
                key: 'statistics',
                body: []
            }
            this.change_state(val)
            let payload = {
                request: this.request,
                key: 'statistics',
                body: []
            }
            await this.get_page(payload)
            if(this.statistics.services !== null) {
                this.statistics.services.forEach((item, index) => {
                    item.isActive = index
                })
            }
            if(this.statistics.chargeValue == null && this.statistics.services == null && this.statistics.incomingValue == null) {
                let payload = {
                            isShow: true,
                            msg: 'Данных нет',
                            type: 'success'
                        }
                        this.change_alert(payload)
                        setTimeout(() => this.clear_alert(), 2000)
                        this.change_recovery_password(false)
            }
        },
        changeOperationList(e) {
            if(e.id == 3) {
                let val = {
                key: 'statistics',
                body: []
            }
            this.change_state(val)
            this.activeOperationList = e.id
            this.change_calendar(true)
            } else {
                this.change_calendar(false)
                this.activeOperationList = e.id
                this.get_details()
            }
        },
        changePeriod(e) {
            this.dateFrom = e[0]
            this.dateTo = e[1]
            this.get_details()
            this.change_calendar(false)
        },
        clickDetail(e) {
            if(this.isActiveDetail == e.isActive) {
                this.isActiveDetail = null
            } else this.isActiveDetail = e.isActive
    }
    },
    mounted() {
        this.get_details()
    }
}
</script>
<style scoped>
.shadow {
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}
</style>