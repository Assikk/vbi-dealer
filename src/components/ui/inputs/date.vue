<template>
    <div class="text-base text-Vgray"
    :class="label ? 'flex flex-col gap-2' : ''">
        <label :for="id">{{label}}</label>
        <div class="h-20">
            <div class="relative">
                <input :placeholder="placeholder" :id="id"
                :value="modelValue"
                :disabled="disabled"
                v-imask="mask"
                :maxlength="maxlength"
                @accept="onAccept($event)"
                class="w-full p-4 border-[1px] rounded-xl outline-0"
                :class="error ? 'border-red' : 'border-[#E2E8F0] focus:border-[#194BFB]'">
                <div v-if="disabled" class="rounded-xl absolute top-0 left-0 z-10 bg-Vgray w-full h-full"/>
            </div>
            <p class="z-10 px-2 mt-1 text-sm text-red">
                {{error}}
            </p>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import rotateString from '@/plugins/rotateString'
import { IMaskDirective } from 'vue-imask';
import IMask from 'imask';
export default {
    name: 'InputDateComponent',
    props: ['id', 'label', 'modelValue', 'placeholder', 'maxlength', 'disabled'],
    directives: {
      imask: IMaskDirective
    },
    data() {
        return {
            mask: {
                mask: Date,
                pattern: 'DD-MM-YYYYY',
                // pattern: 'YYYY-MM-DD',
                blocks: {
                    YYYY: {
                        mask: IMask.MaskedRange,
                        from: 1900,
                        to: this.year()
                    },
                    MM: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12
                    },
                    DD: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 31
                    },
                },
            },
            error: ''
        }
    },
    methods: {
        year() {
            return new Date().getFullYear()
        },
        onAccept(e) {
            if(e.detail.value.length == 0) {
                this.error = 'Это поле обязателен для заполнения'
            } else {
                if(e.detail.value.length == 10) {
                    let date = rotateString(e.detail.value, '-')
                    let nowDate = moment().format('YYYY-MM-DD')
                    if(date > nowDate) {
                        this.error = 'Нельзя вводить будущую дату'
                    } else {
                        this.error = ''
                    } 
                } else this.error = ''
            }
            this.$emit('update:modelValue', e.detail.value)
        },
    },
}
</script>