<template>
    <div class="w-screen h-screen fixed z-[99999] bg-black/75">
        <div class="center w-[510px]">
            <img src="@/assets/img/close.png" alt="Close Icon" class="mb-2 w-5 h-5 cursor-pointer shadow-slate-50 ml-auto"
            @click="show_isConfirmation(false)">
            <div class="bg-white rounded p-10 text-center">
                <Title>
                    SMS подтверждение
                </Title>
                <Text class="mt-4 mb-10">
                    Мы отправили код на номер <br/> +{{abonent.phoneNumber}}
                </Text>
                <div class="flex gap-6 justify-center">
                    <Input v-model="code.first"
                    @keyup="goNextCode($event, 'second')"
                    id="first"/>
                    <Input v-model="code.second"
                    @keyup="goNextCode($event, 'third')"
                    id="second"/>
                    <Input v-model="code.third"
                    @keyup="goNextCode($event, 'four')"
                    id="third"/>
                    <Input v-model="code.four"
                    @keyup="goNextCode($event, 'first')"
                    id="four"/>
                </div>
                <Button 
                :disabled="sendButton.disabled"
                :active="sendButton.active"
                @click="sendCode"
                class="mt-10 mb-6">
                    Отправить
                </Button>
                <Text>
                    Отправить повторно через <Timer/>
                </Text>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Title from '@/components/ui/texts/ExtraBold-Vblack-3xl2.vue'
import Text from '@/components/ui/texts/Medium-Vgray-Base.vue'
import Input from '@/components/ui/inputs/single.vue'
import Button from '@/components/ui/buttons/primary.vue'
import Timer from '@/components/ui/timer.vue'
export default {
    name: 'SMSconfirmationApplication',
    components: {
        Input, 
        Button,
        Title,
        Text,
        Timer
    },
    computed: {
        ...mapState({
            abonent: state => state.abonent,
            alert: state => state.Alert.alert,
            sms: state => state.sms
        })
    },
    data() {
        return {
            code: {
                first: '',
                second: '',
                third: '',
                four: '',
            },
            sendButton: {
                disabled: true,
                active: false
            }
        }
    },
    methods: {
        ...mapMutations({
            show_isConfirmation: 'SMSconfirmation/CHANGE_CONFIRMATION',
            change_state: 'CHANGE_STATE',
            change_search_number: 'searchNumber/CHANGE_SHOW'
        }),
        ...mapActions({
            post_request: 'post_request'
        }),
        async sendCode() {
            let code = ''
            for (let key in this.code) {
                code = code + this.code[key]
            }
            let alert = {
                key: 'abonent',
                body: {
                    phoneNumber: this.abonent.phoneNumber,
                    code: code
                }
            }
            this.change_state(alert)
            let payload
            if(this.$route.path == '/home') {
                payload = {
                    request: 'otp/read/check',
                    body: this.abonent
                }
            } else {
                payload = {
                    request: this.sms.request,
                    body: {
                        code: this.abonent.code,
                        requestId: this.sms.body
                    }
                }
            }
            await this.post_request(payload)
            if(this.alert.type == 'error') {
                let abonent = {
                key: 'abonent',
                body: {
                    phoneNumber: '',
                    code: ''
                }
            }
            this.change_state(abonent)
                this.show_isConfirmation(false)
            }
            if(this.alert.type == 'success') {
                if(this.$route.path == '/home') {
                    window.localStorage.setItem('abonentNumber', this.abonent.phoneNumber)
                    this.$router.push('user-dashboard')
                    let abonent = {
                        key: 'abonent',
                        body: {
                            phoneNumber: '',
                            code: ''
                        }
                    }
                    this.change_state(abonent)
                } else {
                    let abonent = {
                        key: 'abonent',
                        body: {
                            phoneNumber: '',
                            code: ''
                        }
                    }
                    this.change_state(abonent)
                    this.change_search_number(false)
                    this.$router.push('/home')
                }
                this.show_isConfirmation(false)
            }
        },
        goNextCode(x, val) {
            if(x.target.value.length > 0) {
                document.getElementById(val).focus()
            }
        },
    },
    watch: {
        code: {
            handler(val) {
                if(Object.values(val).filter(f => f == '').length) {
                    this.sendButton.disabled = true
                } else this.sendButton.disabled = false
            },
            deep: true
        }
    }
}
</script>