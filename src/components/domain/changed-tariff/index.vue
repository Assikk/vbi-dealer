<template>
    <div>
        <Header title="Статистика тарифов"/>
        <Title class="text-center">
            Смена тарифа
        </Title>
        <div class="my-4">
            <Button class="w-fit"
            v-if="stepExport == 1"
            @click="exportExcel">
                Эскпорт в Excel
            </Button>
            <div v-if="stepExport == 2">
                <p v-if="!exportCheck.isComplete">
                    Экспортирование...
                </p>
                <p v-if="exportCheck.isComplete">
                    Экспортирование завершено
                </p>
                <progress :max="exportCheck.exportEnd" :value="exportCheck.exportCurrent"
                class="w-full my-2"/>
                <span v-if="!exportCheck.isComplete" class="cursor-pointer hover:border-b-[1px] hover:border-dashed"
                @click="reload">
                    Отменить экспортирование
                </span>
            </div>
        </div>
        <Pagination :active="paginationList[0].priceplan" :list="paginationList" class="mr-auto mt-2"
        @pagination="changePagination" :totalAmounts="statistics.totalElements"/>
        <div class="mt-4 text-center text-xs overflow-auto lg:overflow-visible">
            <div class="py-2 border-y-[1px] border-[#EDF2F7]">
                <div class="flex gap-2 py-5">
                    <HeaderText class="min-w-[80px] w-[5%]">
                        №
                    </HeaderText>
                    <HeaderText class="min-w-[192px] w-[10%]">
                        Телефон
                    </HeaderText>
                    <HeaderText class="min-w-[176px] w-[15%]">
                        Старый
                    </HeaderText>
                    <HeaderText  class="min-w-[176px] w-[15%]">
                        Новый
                    </HeaderText>
                    <HeaderText  class="min-w-[192px] w-[15%]">
                        Данные паспорта
                    </HeaderText>
                    <HeaderText  class="min-w-[112px] w-[5%]">
                        Цена
                    </HeaderText>
                    <HeaderText class="min-w-[192px] w-[15%]">
                        Статус
                    </HeaderText>
                    <HeaderText class="min-w-[176px] w-[15%]">
                        Дата
                    </HeaderText>
                    <div class="min-w-[80px] w-[5%]"/>
                </div>
                <div class="flex gap-2 items-center w-full gap-2">
                    <input type="text" class="input min-w-[80px] w-[5%]" v-model="filtr.id"
                    @input="filterId">
                    <input type="text" class="input min-w-[192px] w-[10%]" v-model="filtr.phoneNumber" :maxlength="maxlengthPhone(filtr.phoneNumber)"
                    @input="filterPhoneNumber">
                    <input type="text" class="input min-w-[176px] w-[15%]" v-model="filtr.oldPriceplan">
                    <input type="text" class="input min-w-[176px] w-[15%]" v-model="filtr.newPriceplan">
                    <input type="text" class="input min-w-[72px] w-[5%]" v-model="filtr.passportSerial" maxlength="2"
                    @input="filterPassportSerial">
                    <input type="text" class="input min-w-[120px] w-[10%]" v-model="filtr.passportNumber" maxlength="7"
                    @input="filterPassportNumber">
                    <input type="text" class="input min-w-[112px] w-[5%]" v-model="filtr.price"
                    @input="filtrPrice">
                    <select @change="((e) => filtr.status = e.target.value)" class="input min-w-[192px] w-[15%]">
                        <option selected/>
                        <option v-for="item in statuses" :key="item.id" :value="item.id">{{item.name}}</option>
                    </select>
                    <p class="text-[10px] input pt-0.5 min-w-[176px] w-[15%] bg-white cursor-pointer"
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
            <div v-for="item in statistics.content" :key="item.id" class="flex gap-2 border-b-[1px] border-[#EDF2F7] py-[30px]">
                <BoldText class="min-w-[80px] w-[5%]">
                    {{item.id}}
                </BoldText>
                <Text class="min-w-[192px] w-[10%]">
                    {{item.phoneNumber}}
                </Text>
                <Text class="min-w-[176px] w-[15%]">
                    {{item.oldPriceplan}}
                </Text>
                <Text  class="min-w-[176px] w-[15%]">
                    {{item.newPriceplan}}
                </Text>
                <Text  class="min-w-[192px] w-[15%]">
                    {{item.passportSerial}}{{item.passportNumber}}
                </Text>
                <Text  class="min-w-[112px] w-[5%]">
                    {{item.price}}
                </Text>
                <Text class="min-w-[192px] w-[15%]">
                    <span class="w-full rounded p-1"
                    :class="item.statusId == 46 ? 'bg-[№FFFF00]' : item.statusId == 45 ? 'bg-[#00D678]' : 'bg-[#FF0000]'">
                        {{item.status}}
                    </span>
                </Text>
                <Text class="min-w-[176px] w-[15%]">
                    {{item.createdAt}}
                </Text>
                <div class="min-w-[80px] w-[5%]"/>
            </div>
        </div>
        <PagePagination
        :pagination="statistics" 
        @changePage="changePage" 
        @nextPage="nextPage"
        @previousPage="previousPage"/>
        <Transition>
            <Calendar v-if="isCalendar" @changePeriod="changePeriod" @clear="clear"/>
        </Transition>
    </div>
</template>
<script>
import Title from '@/components/ui/titles/lg-semibold.vue'
import Calendar from '@/components/ui/application/calendar/index.vue'
import Pagination from '@/components/ui/pagination.vue'
import clearSymbols from '@/plugins/clearSymbols'
import clearNumbers from '@/plugins/clearNumbers'
import {mapState, mapMutations, mapActions} from 'vuex'
import Header from '@/components/ui/header.vue'
import HeaderText from '@/components/ui/texts/ExtraBold-Vgray-Base.vue'
import BoldText from '@/components/ui/texts/ExtraBold-Vblack-Base.vue'
import Text from '@/components/ui/texts/Semibold-Vblack-Base.vue'
import PagePagination from '@/components/ui/pagePagination.vue'
import Button from '@/components/ui/buttons/primary.vue'
export default {
    name: 'Changed-tariffComponent',
    components: {
        Title, 
        Pagination, 
        Calendar,
        Header,
        HeaderText,
        BoldText,
        Text,
        PagePagination,
        Button, 
    },
    computed: {
        ...mapState({
            isCalendar: state => state.Calendar.isCalendar,
            statistics: state => state.statistics,
            statuses: state => state.page,
            exportFileId: state => state.exportFileId,
            exportCheck: state => state.exportCheck,
            exportFile: state => state.exportFile
        })
    },
    data() {
        return {
            filtr: {
                id: '',
                phoneNumber: '',
                oldPriceplan: '',
                newPriceplan: '',
                passportSerial: '',
                passportNumber: '',
                price: '',
                status: '',
                createdAt: ['','']
            },
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
            activePaginationList: '10',
            calendarText: 'Щелкните чтобы выбрать дату',
            page: '0',
            stepExport: 1,
            interval: null
        }
    },
    methods: {
        ...mapMutations({
            change_calendar: 'Calendar/CHANGE_CALENDAR'
        }),
        ...mapActions({
            get_page: 'get_pagedata',
            get_file: 'get_file'
        }),
        maxlengthPhone(e) {
            if(e.startsWith('99')) {
                if(e.startsWith('998')) {
                    return 12
                } else {
                    return 3
                }
            } else {
                return 2
            }
        },
        clear() {
            this.filtr.createdAt = ['','']
            this.calendarText = `${this.filtr.createdAt[0]}${this.filtr.createdAt[1]}`
            this.change_calendar(false)
        },
        async get_statitics() {
            let payload = {
                request: `change-priceplan?page=${this.page}&size=${this.activePaginationList}`,
                body: [],
                key: 'statistics'
            }
            await this.get_page(payload)
        },
        filterId() {
            this.filtr.id = clearSymbols(this.filtr.id)
        },
        filterPhoneNumber() {
            this.filtr.phoneNumber = clearSymbols(this.filtr.phoneNumber)
        },
        filterPassportSerial() {
            this.filtr.passportSerial = this.filtr.passportSerial.toUpperCase()
            this.filtr.passportSerial = clearNumbers(this.filtr.passportSerial)
        },
        filterPassportNumber() {
            this.filtr.passportNumber = clearSymbols(this.filtr.passportNumber)
        },
        filtrPrice() {
            this.filtr.price = clearSymbols(this.filtr.price)
        },
        async get_statuses() {
            let payload = {
                request: 'change-priceplan/statuses',
                body: [],
                key: 'page'
            }
            await this.get_page(payload)
        },
        changeDate() {
            this.change_calendar(true)
        },
        changePeriod(e) {
            this.filtr.createdAt = e
            this.calendarText = `${this.filtr.createdAt[0]} - ${this.filtr.createdAt[1]}`
            this.change_calendar(false)
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
                request: `change-priceplan?page=${this.page}&size=${this.activePaginationList}&search=${this.filtr.id.length > 0 ? `id:${this.filtr.id},` : ''}${this.filtr.phoneNumber.length > 0 ? `phoneNumber:*${this.filtr.phoneNumber}*,` : ''}${this.filtr.oldPriceplan.length > 0 ? `oldPriceplan:${this.filtr.oldPriceplan},` : ''}${this.filtr.newPriceplan.length > 0 ? `newPriceplan:${this.filtr.newPriceplan},` : ''}${this.filtr.passportSerial.length > 0 ? `passportSerial:*${this.filtr.passportSerial}*,` : ''}${this.filtr.passportNumber.length > 0 ? `passportNumber:*${this.filtr.passportNumber}*,` : ''}${this.filtr.price.length > 0 ? `price:${this.filtr.price},` : ''}${this.filtr.status.length > 0 ? `statusId:${this.filtr.status},` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
                body: [],
                key: 'statistics'
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
                request: `change-priceplan?page=${this.page}&size=${this.activePaginationList}&search=${this.filtr.id.length > 0 ? `id:${this.filtr.id},` : ''}${this.filtr.phoneNumber.length > 0 ? `phoneNumber:*${this.filtr.phoneNumber}*,` : ''}${this.filtr.oldPriceplan.length > 0 ? `oldPriceplan:${this.filtr.oldPriceplan},` : ''}${this.filtr.newPriceplan.length > 0 ? `newPriceplan:${this.filtr.newPriceplan},` : ''}${this.filtr.passportSerial.length > 0 ? `passportSerial:*${this.filtr.passportSerial}*,` : ''}${this.filtr.passportNumber.length > 0 ? `passportNumber:*${this.filtr.passportNumber}*,` : ''}${this.filtr.price.length > 0 ? `price:${this.filtr.price},` : ''}${this.filtr.status.length > 0 ? `statusId:${this.filtr.status},` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
                body: [],
                key: 'statistics'
            }
            await this.get_page(payload)
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
        },
        async exportExcel() {
            let dateFrom
            let dateTo
            if(this.filtr.createdAt[0].length > 0 && this.filtr.createdAt[1].length > 0) {
                dateFrom = this.filtr.createdAt[0]
                dateFrom = dateFrom.replaceAll('-', '')
                dateTo = this.filtr.createdAt[1]
                dateTo = dateTo.replaceAll('-', '')
            }
            let exportRequest= {
                request: `change-priceplan/export?search=${this.filtr.id.length > 0 ? `id:${this.filtr.id},` : ''}${this.filtr.phoneNumber.length > 0 ? `phoneNumber:*${this.filtr.phoneNumber}*,` : ''}${this.filtr.oldPriceplan.length > 0 ? `oldPriceplan:${this.filtr.oldPriceplan},` : ''}${this.filtr.newPriceplan.length > 0 ? `newPriceplan:${this.filtr.newPriceplan},` : ''}${this.filtr.passportSerial.length > 0 ? `passportSerial:*${this.filtr.passportSerial}*,` : ''}${this.filtr.passportNumber.length > 0 ? `passportNumber:*${this.filtr.passportNumber}*,` : ''}${this.filtr.price.length > 0 ? `price:${this.filtr.price},` : ''}${this.filtr.status.length > 0 ? `statusId:${this.filtr.status},` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
                key: 'exportFileId',
                body: null
            }
            await this.get_page(exportRequest)
            this.stepExport = 2
            this.checkExcel()
        },
        async checkExcel() {
            let checkRequest = {
                    request: `export/check/${this.exportFileId.fileId}`,
                    key: 'exportCheck',
                    body: {}
                }
                await this.get_page(checkRequest)
                this.interval = setInterval(() => {
                    this.get_page(checkRequest)
                }, 2000)
                if(this.exportCheck.isComplete) {
                    clearInterval(this.interval)
                }
        },
        async downloadExcel() {
            let downloadRequest = {
                request: `export/download/${this.exportFileId.fileId}`,
                headers: {
                        'responseType': 'blob'
                    },
            }
            await this.get_file(downloadRequest)
            let test = document.createElement('a');
            test.href = this.exportFile
            test.setAttribute('download', 'tariff.xlsx');
            document.body.appendChild(test);
            test.click()
        },
        reload() {
            location.reload()
        }
    },
    mounted() {
        this.get_statitics()
        this.get_statuses()
    },
    watch: {
        'exportCheck.isComplete'() {
            if(this.exportCheck.isComplete) {
                clearInterval(this.interval)
                 this.downloadExcel()
            }
        }
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
progress::-webkit-progress-bar {
    border-radius: 12px;
    background-color: #e5e5e5;
}
progress::-webkit-progress-value {
    border-radius: 12px;
    background-color: #4caf50;
}
</style>