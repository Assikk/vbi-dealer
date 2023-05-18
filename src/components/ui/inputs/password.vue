<template>
    <div class="flex flex-col gap-2">
        <label :for="id">
            {{ label }}
        </label>
        <div class="h-20">
            <div class="relative">
                <input 
                :type="closeEye ? 'password' : 'text'" 
                :id="id" 
                class="w-full border-[1px] outline-0 p-4 rounded-xl text-base"
                :class="error.length > 0 ? 'border-red' : 'border-[#E2E8F0] focus:border-[#194BFB]'" 
                :placeholder="placeholder"
                :value="modelValue"
                @input="input($event)">
                <span class="absolute top-1/2 transform -translate-y-1/2 right-[18px] cursor-pointer"
                v-if="modelValue.length > 0"
                @click="closeEye = !closeEye">
                    <svg class="stroke-[#718096]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    v-if="closeEye">
                        <path d="M3 3L21 21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.584 10.587C10.2087 10.962 9.99778 11.4708 9.99759 12.0013C9.9974 12.5318 10.208 13.0407 10.583 13.416C10.958 13.7913 11.4667 14.0022 11.9973 14.0024C12.5278 14.0026 13.0367 13.792 13.412 13.417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.363 5.365C10.2204 5.11972 11.1082 4.99684 12 5C16 5 19.333 7.333 22 12C21.222 13.361 20.388 14.524 19.497 15.488M17.357 17.349C15.726 18.449 13.942 19 12 19C8 19 4.667 16.667 2 12C3.369 9.605 4.913 7.825 6.632 6.659" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg class="stroke-[#718096]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    v-if="!closeEye">
                        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 12C19.333 16.667 16 19 12 19C8 19 4.667 16.667 2 12C4.667 7.333 8 5 12 5C16 5 19.333 7.333 22 12Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <p class="px-2 mt-1 text-sm text-red">
                    {{error}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
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
        }
    },
    data() {
        return {
            closeEye: true,
            error: ''
        }
    },
    methods: {
        input(e) {
            e.target.value = e.target.value.replace(/[а-яА-ЯёЁ\s]/g,'')
            if(e.target.value.length == 0) {
                this.error = 'Это поле обязателен для заполнения'
            } else this.error = ''
            this.$emit('update:modelValue', e.target.value)
        },
    }
}
</script>