<template>
    <div class="w-screen h-screen fixed z-[9999] bg-black/40">
        <div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[90%]">
            <div class="h-[500px] overflow-y-scroll bg-white rounded p-1">
                <Header/>
                <Body/>
            </div>
        </div>
    </div>
</template>
<script>
import Header from './header.vue'
import Body from './body.vue'
export default {
    name: 'SearchNumberApplication',
    components: {
        Header, Body
    }
}
</script>