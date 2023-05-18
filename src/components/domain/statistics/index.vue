<template>
    <Header title="Статистика регистраций"/>
    <!-- <Tabs/> -->
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
                <HeaderText class="min-w-[192px] w-1/5">
                    Телефон
                </HeaderText>
                <HeaderText class="min-w-[192px] w-1/5">
                    Номер договора
                </HeaderText>
                <HeaderText class="min-w-[192px] w-1/5">
                    Номер реестра
                </HeaderText>
                <HeaderText  class="min-w-[144px] w-[10%]">
                    Имя
                </HeaderText>
                <HeaderText  class="min-w-[144px] w-[10%]">
                    Фамилия
                </HeaderText>
                <HeaderText  class="min-w-[144px] w-[10%]">
                    Отчество
                </HeaderText>
                <HeaderText class="min-w-[192px] w-1/5">
                    Статус
                </HeaderText>
                <HeaderText class="min-w-[176px] w-1/5">
                    Дата
                </HeaderText>
                <div class="min-w-[80px] w-[5%]"/>
            </div>
            <div class="flex gap-2 items-center w-full gap-2">
                <input type="text" class="input min-w-[80px] w-[5%]" v-model="filtr.id"
                @input="filterId">
                <input type="text" class="input min-w-[192px] w-1/5" v-model="filtr.phoneNumber"
                :maxlength="maxlengthPhone(this.filtr.phoneNumber)" @input="filterPhoneNumber">
                <input type="text" class="input min-w-[192px] w-1/5" v-model="filtr.applicationNumber">
                <input type="text" class="input min-w-[192px] w-1/5" v-model="filtr.registryNumber">
                <input type="text" class="input min-w-[144px] w-[10%]" v-model="filtr.name"
                @input="filterName">
                <input type="text" class="input min-w-[144px] w-[10%]" v-model="filtr.surname"
                @input="filterSurname">
                <input type="text" class="input min-w-[144px] w-[10%]" v-model="filtr.middleName"
                @input="filterMiddleName">
                <select @change="((e) => filtr.statusId = e.target.value)" class="input min-w-[192px] w-1/5">
                    <option selected/>
                    <option v-for="item in statuses" :key="item.id" :value="item.id">{{item.name}}</option>
                </select>
                <p class="text-[10px] input pt-0.5 min-w-[176px] w-1/5 bg-white cursor-pointer overflow-clip"
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
        @click="editPage(item)">
            <BoldText class="min-w-[80px] w-[5%]">
                {{item.id}}
            </BoldText>
            <Text class="min-w-[192px] w-1/5">
                {{item.phoneNumber}}
            </Text>
            <Text class="min-w-[192px] w-1/5">
                {{item.applicationNumber}}
            </Text>
            <Text class="min-w-[192px] w-1/5">
                {{item.registryNumber}}
            </Text>
            <Text  class="min-w-[144px] w-[10%]">
                {{item.name}}
            </Text>
            <Text  class="min-w-[144px] w-[10%]">
                {{item.surname}}
            </Text>
            <Text  class="min-w-[144px] w-[10%]">
                {{item.middleName}}
            </Text>
            <Text class="min-w-[192px] w-1/5">
                <span class="w-full rounded p-1"
                :class="item.statusId == 46 ? 'bg-[№FFFF00]' : item.statusId == 45 ? 'bg-[#00D678]' : item.statusId == 4 ? 'bg-[#FFFF00]' : 'bg-[#FF0000]'">
                    {{item.statusMessage}}
                </span>
            </Text>
            <Text class="min-w-[176px] w-1/5">
                {{item.createdAt}}
            </Text>
            <div class="flex items-center gap-2">
                <img src="@/assets/img/pencil.svg" alt="Pencil Icon" class="w-4 h-4 cursor-pointer mx-auto"
                @click="editPage(item)">
                <svg fill="none" stroke="#111827" width="16" height="16" class="min-w-[16px] min-h-[16px] h-4 w-4 cursor-pointer"
                @click="printout(item)">
                    <use xlink:href="#printer"/>
                </svg>
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
</template>
<script>
import Pagination from '@/components/ui/pagination.vue'
import PagePagination from '@/components/ui/pagePagination.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
// import Tabs from '@/components/domain/registration-abonent/tabs.vue'
import Calendar from '@/components/ui/application/calendar/index.vue'
import clearSymbols from '@/plugins/clearSymbols'
import clearNumbers from '@/plugins/clearNumbers'
import Header from '@/components/ui/header.vue'
import HeaderText from '@/components/ui/texts/ExtraBold-Vgray-Base.vue'
import BoldText from '@/components/ui/texts/ExtraBold-Vblack-Base.vue'
import Text from '@/components/ui/texts/Semibold-Vblack-Base.vue'
import Button from '@/components/ui/buttons/primary.vue'
import downloadDoc from '@/plugins/downloadDoc'
export default {
    name: 'StatisticsComponent',
    components: {
        Pagination, 
        Button, 
        Calendar, 
        PagePagination,
        Header,
        HeaderText,
        BoldText,
        Text
    },
    data() {    
        return {
            filtr: {
                id: '',
                phoneNumber: '',
                name: '',
                surname: '',
                middleName: '',
                statusId: '',
                applicationNumber: '',
                registryNumber: '',
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
            page: '0',
            calendarText: 'Щелкните чтобы выбрать дату',
            isPagination: false,
            stepExport: 1,
            interval: null
        }
    },
    computed: {
        ...mapState({
            statistics: state => state.statistics,
            isCalendar: state => state.Calendar.isCalendar,
            statuses: state => state.page,
            exportFileId: state => state.exportFileId,
            exportCheck: state => state.exportCheck,
            exportFile: state => state.exportFile,
            dataPage: state => state.data,
            scan: state => state.scan,
        }),
    },
    methods: {
        ...mapMutations({
            change_calendar: 'Calendar/CHANGE_CALENDAR',
            change_state: 'CHANGE_STATE'
        }),
        ...mapActions({
            get_page: 'get_pagedata',
            get_file: 'get_file',
            post_scan: 'post_scan'
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
        async printout(item) {
            let payload = {
                request: `registrations/regenerate-application-pdf/${item.id}`,
                body: item,
                headers: {
                    'responseType': 'blob'
                },
            }
            await this.post_scan(payload)
            downloadDoc(this.scan, 'registration.pdf');
        },
        async get_statistics() {
            let payload = {
                request: `registrations?page=${this.page}&size=${this.activePaginationList}`,
                key: 'statistics',
                body: []
            }
            await this.get_page(payload)
        },
        filterId() {
            this.filtr.id = clearSymbols(this.filtr.id)
        },
        filterPhoneNumber() {
            this.filtr.phoneNumber = clearSymbols(this.filtr.phoneNumber)
        },
        filterName() {
            this.filtr.name = clearNumbers(this.filtr.name)
        },
        filterSurname() {
            this.filtr.surname = clearNumbers(this.filtr.surname)
        },
        filterMiddleName() {
            this.filtr.middleName = clearNumbers(this.filtr.middleName)
        },
        changeDate() {
            this.change_calendar(true)
        },
        changePeriod(e) {
            this.filtr.createdAt = e
            this.calendarText = `${this.filtr.createdAt[0]} - ${this.filtr.createdAt[1]}`
            this.change_calendar(false)
        },
        clear() {
            this.filtr.createdAt = ['','']
            this.calendarText = `${this.filtr.createdAt[0]}${this.filtr.createdAt[1]}`
            this.change_calendar(false)
        },
        async get_statuses() {
            let payload = {
                request: 'registrations/statuses',
                key: 'page',
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
                request: `registrations?page=${this.page}&size=${this.activePaginationList}&search=${this.filtr.id.length > 0 ? `id:${this.filtr.id},` : ''}${this.filtr.name.length > 0 ? `name:*${this.filtr.name}*,` : ''}${this.filtr.applicationNumber.length > 0 ? `applicationNumber:*${this.filtr.applicationNumber}*,` : ''}${this.filtr.registryNumber.length > 0 ? `registry:*${this.filtr.registryNumber}*,` : ''}${this.filtr.middleName.length > 0 ? `middleName:*${this.filtr.middleName}*,` : ''}${this.filtr.surname.length > 0 ? `surname:*${this.filtr.surname}*,` : ''}${this.filtr.phoneNumber.length > 0 ? `phoneNumber:*${this.filtr.phoneNumber}*,` : ''}${this.filtr.statusId.length > 0 ? `statusId:${this.filtr.statusId},` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
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
                request: `registrations?page=${this.page}&size=${this.activePaginationList}&search=${this.filtr.id.length > 0 ? `id:${this.filtr.id}` : ''},${this.filtr.phoneNumber.length > 0 ? `phoneNumber:*${this.filtr.phoneNumber}*` : ''},${this.filtr.name.length > 0 ? `name:*${this.filtr.name}*` : ''},${this.filtr.surname.length > 0 ? `surname:*${this.filtr.surname}*` : ''},${this.filtr.middleName.length > 0 ? `middleName:*${this.filtr.middleName}*` : ''},${this.filtr.statusId.length > 0 ? `statusId:${this.filtr.statusId},` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
                key: 'statistics',
                body: []
            }
            await this.get_page(payload)
        },
        async editPage(e) {
            if(e.statusId !== 46) {
                this.$router.push(`registration-abonent/${e.id}/read`)
            } else {
                let payload = {
                    request: `registrations/${e.id}`,
                    key: 'data',
                    body: {}
                }
                await this.get_page(payload)
                if(this.dataPage.isPartialPayment) {
                    this.$router.push('installment')
                } else this.$router.push('registration-abonent')
            }
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
                request: `registrations/export?search=${this.filtr.id.length > 0 ? `id:${this.filtr.id},` : ''}${this.filtr.name.length > 0 ? `name:*${this.filtr.name}*,` : ''}${this.filtr.middleName.length > 0 ? `middleName:*${this.filtr.middleName}*,` : ''}${this.filtr.surname.length > 0 ? `surname:*${this.filtr.surname}*,` : ''}${this.filtr.phoneNumber.length > 0 ? `phoneNumber:*${this.filtr.phoneNumber}*,` : ''}${this.filtr.statusId.length > 0 ? `statusId:${this.filtr.statusId},` : ''}${this.filtr.createdAt[0].length > 0 ? `createdAt!${dateFrom},` : ''}${this.filtr.createdAt[1].length > 0 ? `createdAt@${dateTo}` : ''}`,
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
            test.setAttribute('download', 'statistics.xlsx');
            document.body.appendChild(test);
            test.click()
        },
        reload() {
            location.reload()
        }
    },
    mounted() {
        this.get_statuses()
        this.get_statistics()
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