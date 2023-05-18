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
                disabled
                class="w-full border-[1px] outline-0 p-4 rounded-xl disabled:bg-white"
                :class="status == 'success' ? 'border-[#2db32d]' : status == 'error' ? 'border-red' : 'border-[#E2E8F0]'" 
                :placeholder="placeholder"
                :value="modelValue"
                @input="$emit('update:modelValue', e.target.value)">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DefaultInputComponent',
    props: {
        id: {
            type: String,
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
        status: {
            type: String
        }
    },
}
</script>