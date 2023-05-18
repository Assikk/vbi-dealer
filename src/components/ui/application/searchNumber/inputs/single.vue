<template>
    <input type="text" class="w-9 px-[10px] h-[44px] border-2 border-gray outline-0"
    placeholder="X"
    :value="modelValue" 
    @input="input($event)"
    maxlength="1">
</template>
<script>
import formatter from '@/plugins/formatters/input'
export default {
    name: 'SingleInput',
    props: ['modelValue'],
    methods: {
        input(e) {
            e = formatter(e, 'number')
            this.$emit('update:modelValue', e.target.value)
        },
    }
}
</script>