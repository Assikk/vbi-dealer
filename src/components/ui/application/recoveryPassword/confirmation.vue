<template>
    <section class="application w-screen h-screen fixed z-[9999] bg-black/40">
        <div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[90%] sm:w-auto">
            <Confirm/>
        </div>
    </section>
</template>
<script>
import Confirm from '../../forms/confirmRecoveryPassword/index.vue'
export default {
    name: 'ApplicationComponent',
    components: {
        Confirm
    }
}
</script>