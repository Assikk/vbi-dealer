<template>
    <section class="application w-screen h-screen fixed z-[9999] bg-black/40">
        <div class="h-full sm:h-auto overflow-auto absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[90%] sm:w-auto">
            <div class="form bg-white rounded p-1 w-auto sm:w-[500px]">
                <Header/>
                <Body/>
            </div>
        </div>
    </section>
</template>
<script>
import Header from './header.vue'
import Body from './body.vue'
export default {
    name: 'changePasswordApplicationComponent',
    components: {
        Header, Body
    },
}
</script>