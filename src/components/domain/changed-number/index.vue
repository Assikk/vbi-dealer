<template>
    <div>
        <Header title="Статистика замен номеров"/>
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
        <div class="mt-4 text-center text-xs overflow-auto">
            <div class="py-2 border-y-[1px] border-[#EDF2F7]">
                <div class="flex gap-2 py-5">
                    <HeaderText class="min-w-[80px] w-[5%]">
                        №
                    </HeaderText>
                    <HeaderText class="min-w-[192px] w-[15%]">
                        Старый номер
                    </HeaderText>
                    <HeaderText  class="min-w-[192px] w-[15%]">
                        Новый номер
                    </HeaderText>
                    <HeaderText class="min-w-[192px] w-1/5">
                        Данные паспорта
                    </HeaderText>
                    <HeaderText class="min-w-[192px] w-1/5">
                        Статус
                    </HeaderText>
                    <HeaderText class="min-w-[176px] w-1/5">
                        Дата
                    </HeaderText>
                    <div class="min-w-[80px] w-[5%]"/>
                </div>
                <div class="flex items-center w-full gap-2">
                    <input type="text" class="input min-w-[80px] w-[5%]" v-model="filtr.id"
                    @input="filterId">
                    <input type="text" class="input min-w-[192px] w-[15%]" v-model="filtr.fromPhoneNumber" :maxlength="maxlengthPhone(filtr.fromPhoneNumber)"
                    @input="filterFromPhoneNumber">
                    <input type="text" class="input min-w-[192px] w-[15%]" v-model="filtr.toPhoneNumber" :maxlength="maxlengthPhone(filtr.toPhoneNumber)"
                    @input="filterToPhoneNumber">
                    <input type="text" class="input min-w-[72px] w-[5%]" v-model="filtr.passportSerial" maxlength="2"
                    @input="filterPassportSerial">
                    <input type="text" class="input min-w-[120px] w-[15%]" v-model="filtr.passportNumber" maxlength="7"
                    @input="filterPassportNumber">
                    <select @change="((e) => filtr.status = e.target.value)" class="input min-w-[192px] w-1/5">
                        <option selected/>
                        <option v-for="item in statuses" :key="item.id" :value="item.id">{{item.name}}</option>
                    </select>
                    <p class="text-[10px] input pt-0.5 min-w-[176px] w-1/5 bg-white cursor-pointer"
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
                <Text class="min-w-[192px] w-[15%]">
                    {{item.fromPhoneNumber}}
                </Text>
                <Text  class="min-w-[192px] w-[15%]">
                    {{item.toPhoneNumber}}
                </Text>
                <Text  class="min-w-[72px] w-[5%]">
                    {{item.passportSerial}}
                </Text>
                <Text  class="min-w-[120px] w-[15%]">
                    {{item.passportNumber}}
                </Text>
                <Text class="min-w-[192px] w-1/5">
                    <span class="w-full rounded p-1"
                    :class="item.statusId == 46 ? 'bg-[№FFFF00]' : item.statusId == 45 ? 'bg-[#00D678]' : item.statusId == 4 ? 'bg-[#FFFF00]' : 'bg-[#FF0000]'">
                        {{item.status}}
                    </span>
                    <!-- {{item.status}} -->
                </Text>
                <Text class="min-w-[176px] w-1/5">
                    {{item.createdAt}}
                </Text>
                <div class="min-w-[80px] w-[5%]">
                </div>
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
import Pagination from '@/components/ui/pagination.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
import Calendar from '@/components/ui/application/calendar/index.vue'
import clearSymbols from '@/plugins/clearSymbols'
import clearNumbers from '@/plugins/clearNumbers'
import BoldText from '@/components/ui/texts/ExtraBold-Vblack-Base.vue'
import Text from '@/components/ui/texts/Semibold-Vblack-Base.vue'
import HeaderText from '@/components/ui/texts/ExtraBold-Vgray-Base.vue'
import Header from '@/components/ui/header.vue'
import PagePagination from '@/components/ui/pagePagination.vue'
import Button from '@/components/ui/buttons/primary.vue'
export default {
    name: 'ChangedNumberComponent',
    components: {
        Pagination, 
        Calendar, 
        BoldText, 
        Text,
        HeaderText,
        Header,
        PagePagination,
        Button
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
                fromPhoneNumber: '',
                toPhoneNumber: '',
                passportSerial: '',
                passportNumber: '',
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
        async get_statistics() {
            let payload = {
                request: `change-number?page=${this.page}&size=${this.activePaginationList}`,
                key: 'statistics',
                body: []
            }
            await this.get_page(payload)
        },
        filterId() {
            this.filtr.id = clearSymbols(this.filtr.id)
        },
        filterFromPhoneNumber() {
            this.filtr.fromPhoneNumber = clearSymbols(this.filtr.fromPhoneNumber)
        },
        filterToPhoneNumber() {
            this.filtr.toPhoneNumber = clearSymbols(this.filtr.toPhoneNumber)
        },
        filterPassportSerial() {
            this.filtr.passportSerial = this.filtr.passportSerial.toUpperCase()
            this.filtr.passportSerial = clearNumbers(this.filtr.passportSerial)
        },
        filterPassportNumber() {
            this.filtr.passportNumber = clearSymbols(this.filtr.passportNumber)
        },
        async get_statuses() {
            let payload = {
                request: 'change-number/statuses',
                key: 'page',
                body: []
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
                request: `change-number?page=${this.page}&size=${this.activePaginationList}&search=${this.filtr.id.length > 0 ? `id:${this.filtr.id},` : ''}${this.filtr.fromPhoneNumber.length > 0 ? `fromPhoneNumber:*${this.filtr.fromPhoneNumber}*,` : ''}${this.filtr.toPhoneNumber.length > 0 ? `toPhoneNumber:*${this.filtr.toPhoneNumber}*,` : ''}${this.filtr.passportSerial.length > 0 ? `passportSerial:*${this.filtr.passportSerial}*,` : ''}${this.filtr.passportNumber.length > 0 ? `passportNumber:*${this.filtr.passportNumber}*,` : ''}${this.filtr.status.length > 0 ? `statusId:${this.filtr.status},` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
                key: 'statistics',
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
                request: `change-number?page=${this.page}&size=${this.activePaginationList}&search=${this.filtr.id.length > 0 ? `id:${this.filtr.id},` : ''}${this.filtr.fromPhoneNumber.length > 0 ? `fromPhoneNumber:*${this.filtr.fromPhoneNumber}*,` : ''}${this.filtr.toPhoneNumber.length > 0 ? `toPhoneNumber:*${this.filtr.toPhoneNumber}*,` : ''}${this.filtr.passportSerial.length > 0 ? `passportSerial:*${this.filtr.passportSerial}*,` : ''}${this.filtr.passportNumber.length > 0 ? `passportNumber:*${this.filtr.passportNumber}*,` : ''}${this.filtr.status.length > 0 ? `statusId:${this.filtr.status},` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
                key: 'statistics',
                body: []
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
                request: `change-number/export?search=${this.filtr.id.length > 0 ? `id:${this.filtr.id},` : ''}${this.filtr.fromPhoneNumber.length > 0 ? `fromPhoneNumber:*${this.filtr.fromPhoneNumber}*,` : ''}${this.filtr.toPhoneNumber.length > 0 ? `toPhoneNumber:*${this.filtr.toPhoneNumber}*,` : ''}${this.filtr.passportSerial.length > 0 ? `passportSerial:*${this.filtr.passportSerial}*,` : ''}${this.filtr.passportNumber.length > 0 ? `passportNumber:*${this.filtr.passportNumber}*,` : ''}${this.filtr.status.length > 0 ? `statusId:${this.filtr.status},` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
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
            test.setAttribute('download', 'numbers.xlsx');
            document.body.appendChild(test);
            test.click()
        },
        reload() {
            location.reload()
        }
    },
    mounted() {
        this.get_statistics()
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