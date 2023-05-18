<template>
    <div class="mx-[17px] px-10 py-[5px] cursor-pointer inline-block"
    :class="active ? 'border-b-[3px] border-light-yellow' : 'hover:border-b-[3px] hover:border-light-yellow'">
        <Title class="font_family">
            <slot/>
        </Title>
    </div>
</template>
<script>
import Title from '../../titles/base-black.vue'
export default {
    name: 'TabPrimaryCompoennt',
    props: ['active'],
    components: {
        Title
    }
}
</script>
<style scoped>
.font_family {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}
</style>