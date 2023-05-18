<template>
    <div class="flex flex-col gap-2 text-base text-Vgray">
        <label :for="id">
            {{ label }}
        </label>
        <div class="h-20">
            <input 
            type="text" 
            :id="id"
            class="w-full border-[1px] outline-0 p-4 rounded-xl"
            :class="error.length > 0 ? 'border-red' : 'border-[#E2E8F0] focus:border-[#194BFB]'" 
            :placeholder="placeholder"
            :value="modelValue"
            :maxlength="maxLength"
            @input="input($event)">
            <p class="px-2 mt-1 text-sm text-red">
                {{error}}
            </p>
        </div>
    </div>
</template>
<script>
import formatter from '@/plugins/formatters/input'
export default {
    name: 'PhoneInputComponent',
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
    },
    data() {
        return {
            error: '',
            maxLength: 12,
        }
    },
    methods: {
        input(e) {
            e = formatter(e, 'number')
            if(e.target.value.length == 0) {
                this.error = 'Это поле обязателен для заполнения'
            } else this.error = ''
            if(e.target.value.length > 0) {
                if(!e.target.value.startsWith('99')) {
                this.maxLength = 2
                } else {
                    if(!e.target.value.startsWith('998')) {
                        this.maxLength = 3
                    } else {
                        if(e.target.value.startsWith('99890') || e.target.value.startsWith('99891')) {
                            this.maxLength = 12
                        } else this.maxLength = 5
                    }
                }
            } else this.maxLength = 12
            this.$emit('update:modelValue', e.target.value)
        },
    }
}
</script>