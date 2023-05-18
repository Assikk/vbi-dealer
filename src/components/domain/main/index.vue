<template>
    <div>
        <Header title="Главная"/>
        <p>
            Главная страница
        </p>
    </div>
</template>
<script>
import Header from '@/components/ui/header.vue'
export default {
    name: 'MainComponent',
    components: {
        Header,
    },
}
</script>