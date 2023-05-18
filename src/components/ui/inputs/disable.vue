<template>
    <div class="flex flex-col gap-2 text-sm">
        <label :for="id">{{label}}</label>
        <input disabled :value="modelValue" :id="id" type="text"
        @input="filterInput($event.target.value)"
        class="px-[10px] h-[44px] border-[1px] rounded-xl border-[#E2E8F0] focus:border-[#194BFB] outline-0 disabled:bg-white">
    </div>
</template>
<script>
export default {
    name: 'InputComplectComponent',
    props: ['id', 'label', 'modelValue'],
    methods: {
        filterInput(e) {
            this.$emit('update:modelValue', e)
        }
    }
}
</script>