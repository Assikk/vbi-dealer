<template>
    <div class="text-base text-Vgray"
    :class="label ? 'flex flex-col gap-2' : ''">
        <label :for="id">
            {{ label }}
        </label>
        <div class="h-20">
            <div class="relative">
                <input 
                type="text" 
                :id="id"
                :disabled="disabled"
                class="w-full border-[1px] outline-0 p-4 rounded-xl"
                :class="error.length > 0 ? 'border-red' : 'border-[#E2E8F0] focus:border-[#194BFB]'" 
                :placeholder="placeholder"
                :value="modelValue"
                :maxlength="maxlength"
                @input="input($event)">
                <div v-if="disabled && label !== 'Имя'" class="rounded-xl absolute top-0 left-0 z-10 bg-Vgray w-full h-full"/>
            </div>
            <p class="px-2 mt-1 text-sm text-red">
                {{error}}
            </p>
        </div>
    </div>
</template>
<script>
import formatter from '@/plugins/formatters/input'
export default {
    name: 'DefaultInputComponent',
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
        disabled: {
            type: Boolean
        }
    },
    data() {
        return {
            error: '',
        }
    },
    methods: {
        input(e) {
            e = formatter(e, this.type)
            if(e.target.value.length == 0) {
                this.error = 'Это поле обязателен для заполнения'
            } else this.error = ''
            this.$emit('update:modelValue', e.target.value)
        },
    },
}
</script>