<template>
    <Header title="Страница продавца"/>
    <Title class="text-center">
        Информация о продавце
    </Title>
    <div class="flex justify-center mt-4">
        <div v-if="diller" class="shadow w-full sm:w-[60%] p-6 flex flex-col gap-4 text-sm sm:text-base">
            <div class="flex items-center justify-between">
                <p>
                    Регион
                </p>
                <p>
                    {{diller.region}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                Город
                </p>
                <p>
                    {{diller.city}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Район
                </p>
                <p>
                    {{diller.district}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Код дилера
                </p>
                <p>
                    {{diller.dealerCode}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Имя компании дилера
                </p>
                <p>
                    {{diller.dealerCompanyName}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Имя дилера
                </p>
                <p>
                    {{diller.dealerName}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Адрес торговой точки
                </p>
                <p>
                    {{diller.salesPointAddress}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Код торговой точки
                </p>
                <p>
                    {{diller.salesPointCode}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Имя торговой точки
                </p>
                <p>
                    {{diller.salesPointName}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Статус торговой точки
                </p>
                <span class="p-1 text-sm rounded"
                :class="diller.salesPointStatus ? 'bg-[#00D678]' : 'bg-[#ff0000]'">
                    {{salesPointStatus}}
                </span>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Имя продавца
                </p>
                <p>
                    {{diller.sellerName}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Телефон продавца
                </p>
                <p>
                    {{diller.sellerPhone}}
                </p>
            </div>
            <div class="flex items-center justify-between">
                <p>
                    Статус продавца
                </p>
                <span class="p-1 text-sm rounded"
                :class="diller.sellerStatus ? 'bg-[#00D678]' : 'bg-[#ff0000]'">
                    {{sellerStatus}}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Title from '@/components/ui/titles/lg-semibold.vue'
import Header from '@/components/ui/header.vue'
export default {
    name: 'Info-sellerComponent',
    components: {
        Title,
        Header
    },
    computed: {
        ...mapState({
            diller: state => state.diller
        }),
        sellerStatus() {
            if(this.diller.sellerStatus) {
                return 'Активна'
            } else {
               return 'Не активна'
            }
        },
        salesPointStatus() {
            if(this.diller.salesPointStatus) {
                return 'Активна'
            } else {
               return 'Не активна'
            }
        },
    },
    methods: {
        ...mapActions({
            get_request: 'get_pagedata'
        }),
        async get_diller() {
            let payload = {
                request: 'seller-info',
                key: 'diller',
                body: {}
            }
            await this.get_request(payload)
        },
    },
    mounted() {
        this.get_diller()
    }
}
</script>
<style scoped>
.shadow {
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}
</style>