<template>
    <div class="border-b-[1px] border-[#ebebeb] mb-4">
        <div v-for="tab in tabs" :key="tab.id" class="mx-[17px] px-10 py-[5px] cursor-pointer inline-block"
        :class="$route.path.includes(tab.link) ? 'border-b-[3px] border-light-yellow' : 'hover:border-b-[3px] hover:border-light-yellow'"
        @click="$router.push(tab.link)">
            <p class="font-medium font_family">
                {{tab.text}}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TabsRegistrationAbonent',
    data() {
        return {
            tabs: [
                {
                    id: 1,
                    text: 'Новая регистрация',
                    link: 'registration-abonent'
                },
                {
                    id: 2,
                    text: 'Статистика',
                    link: 'statistics'
                }
            ]
        }
    }
}
</script>
<style scoped>
.font_family {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}
</style>