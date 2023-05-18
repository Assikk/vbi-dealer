<template>
    <div class="form bg-white rounded p-1 w-auto sm:w-[500px]">
        <Header/>
        <Body/>
    </div>
</template>
<script>
import Header from './header/index.vue'
import Body from './body/index.vue'
export default {
    name: 'RecoveryPasswordFormComponent',
    components: {
        Header,
        Body
    }
}
</script>