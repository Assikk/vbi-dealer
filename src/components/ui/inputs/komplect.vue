<template>
    <div class="text-base text-Vgray"
    :class="label ? 'flex flex-col gap-2' : ''">
        <label :for="id">
            {{ label }}
        </label>
        <div class="h-20">
            <input 
            type="text" 
            :id="id"
            class="w-full border-[1px] outline-0 p-4 rounded-xl"
            :class="error.status ? 'border-red' : 'border-[#E2E8F0] focus:border-[#194BFB]'" 
            :placeholder="placeholder"
            :value="modelValue"
            :maxlength="maxlength"
            @input="input($event)">
            <p class="px-2 mt-1 text-sm text-red">
                {{error.text}}
            </p>
        </div>
    </div>
</template>
<script>
import formatter from '@/plugins/formatters/input'
export default {
    name: 'KomplectInputComponent',
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String
        },
        placeholder: {
            type: String
        },
        modelValue: {
            required: true
        },
        type: {
            type: String
        },
        maxlength: {
        },
        error: {
            type: Object
        },
    },
    methods: {
        input(e) {
            e = formatter(e, this.type)
            this.$emit('update:modelValue', e.target.value)
        },
    },
}
</script>