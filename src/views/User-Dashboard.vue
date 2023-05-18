<template>
    <section>
        <UserDashboard/>
    </section>
</template>
<script>
import UserDashboard from '@/components/domain/user-dashboard/index.vue'
export default {
    name: 'UserDashboardView',
    components: {
        UserDashboard
    }
}
</script>