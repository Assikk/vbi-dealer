<template>
    <div class="flex flex-col gap-2 text-sm">
        <label v-if="label" :for="id">{{label}}</label>
        <input 
        :placeholder="placeholder" 
        :value="modelValue" 
        :id="id"
        disabled 
        type="text"
        @input="$emit('update:modelValue', $event.target.value)"
        class="px-[10px] h-[44px] border-[1px] border-gray bg-white"
        :maxlength="maxlength"/>
    </div>
</template>
<script>
export default {
    name: 'InputRegistrComponent',
    props: ['id', 'label', 'modelValue', 'placeholder', 'maxlength'],
}
</script>