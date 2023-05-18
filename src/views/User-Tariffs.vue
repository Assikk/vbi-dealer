<template>
    <section>
        <UserTariff/>
    </section>
</template>
<script>
import UserTariff from '@/components/domain/user-tariffs/index.vue'
export default {
    name: 'UserTariffsView',
    components: {
        UserTariff
    }
}
</script>