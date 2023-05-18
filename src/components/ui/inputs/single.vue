<template>
    <input 
    type="text"
    class="w-14 text-center font-extrabold border-[1px] outline-0 p-4 rounded-xl text-2xl text-Vblack"
    :class="error ? 'border-red' : 'border-[#E2E8F0] focus:border-[#194BFB]'"
    :value="modelValue"
    maxlength="1"
    @input="input($event)">
</template>
<script>
import formatter from '@/plugins/formatters/input'
export default {
    name: 'SingleInputComponent',
    props: {
        modelValue: {
            required: true
        },
    },
    data() {
        return {
            error: false
        }
    },
    methods: {
        input(e) {
            e = formatter(e, 'number')
            if(e.target.value.length == 0) {
                this.error = true
            } else this.error = false
            this.$emit('update:modelValue', e.target.value)
        },
    }
}
</script>