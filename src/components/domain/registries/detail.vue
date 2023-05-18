<template>
    <div>
        <p class="font-medium cursor-pointer"
        @click="$router.push(`/registries/${$route.params.id}`)">
            Назад
        </p>
        <div v-if="page" class="w-4/5 mt-4 flex flex-col gap-4">
            <div class="flex gap-8">
                <p class="w-1/2">
                    <span class="font-semibold">Номер регистрации: </span> {{page.registryNumber}}
                </p>
                <p class="w-1/2">
                    <span class="font-semibold">Статус регистрации: </span> {{page.registryStatus}}
                </p>
            </div>
            <div class="flex gap-8">
                <p class="w-1/2">
                    <span class="font-semibold">Кол-во договоров: </span> {{page.applicationsCount}}
                </p>
                <p class="w-1/2">
                    <span class="font-semibold">Тип регистрации: </span> {{page.registryType}}
                </p>
            </div>
            <div class="flex gap-8">
                <p class="w-1/2">
                    <span class="font-semibold">Дата: </span> {{page.createdAt}}
                </p>
                <p class="w-1/2">
                    <span class="font-semibold">Комментарий: </span> {{page.comment}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
    name: 'DetailRegistrComponent',
    computed: {
        ...mapState({
            page: state => state.page
        })
    },
    methods: {
        ...mapActions({
            get_page: 'get_pagedata'
        }),
        async get_registr() {
            let payload = {
                request: `/registries/${this.$route.params.id}`,
                key: 'page',
                body: []
            }
            await this.get_page(payload)
            console.log(this.page);
        },
    },
    mounted() {
        this.get_registr()
    }
}
</script>