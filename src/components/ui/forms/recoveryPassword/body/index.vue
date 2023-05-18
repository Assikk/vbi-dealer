<template>
    <div>
        <div class="flex flex-col gap-4 p-4">
            <Phone
            id="ctn"
            label="Введите номер телефона"
            placeholder="Введите номер телефона"
            v-model="form.username"/>
            <ButtonPrimary :disabled="statusButton.disabled" @click="get_temporary_password" class="mt-4">
                Получить временный пароль
            </ButtonPrimary>
        </div>
        <div class="p-[3.2px] border-t border-light-gray text-right">
            <ButtonClose @click="change_recovery_password(false)">
                Закрыть
            </ButtonClose>
        </div>
    </div>
</template>
<script>
import axios from '@/axios'
import {mapState, mapMutations, mapActions} from 'vuex'
import Phone from '@/components/ui/inputs/phone.vue'
import ButtonPrimary from '@/components/ui/buttons/primary.vue'
import ButtonClose from '@/components/ui/buttons/error.vue'
export default {
    name: 'FormRecoveryPasswordBodyComponent',
    components: {
        ButtonPrimary, ButtonClose, Phone
    },
    computed: {
        ...mapState({
            alert: state => state.Alert.alert
        })
    },
    data() {
        return {
            statusButton: {
                disabled: true,
                active: false
            },
            form: {
                username: ''
            }
        }
    },
    methods: {
        ...mapMutations({
            change_recovery_password: 'recoveryPassword/CHANGE_RECOVERY_PASSWORD',
            confirmation_password: 'recoveryPassword/CONFIRMATION_RECOVERY_PASSWORD',
            change_alert: 'Alert/CHANGE_ALERT',
            clear_alert: 'Alert/CLEAR_ALERT'
        }),
        ...mapActions({
            put_request: 'put_request'
        }),
        async get_temporary_password() {
            if(!this.statusButton.disabled) {
                let alert = {
                    isShow: true,
                    msg: 'Идет загрузка, подождите...',
                    type: 'loaded'
                }
                this.change_alert(alert)
                try {
                    let res = await axios.put('auth/reset-password', this.form)
                    if(res.status == 200) {
                        let alert = {
                            isShow: true,
                            msg: 'Успешно!',
                            type: 'success'
                        }
                        this.change_alert(alert)
                        setTimeout(() => {
                            this.clear_alert()
                        }, 1000)
                        this.change_recovery_password(false)
                    }
                } catch(err) {
                    let alert = {
                        isShow: true,
                        msg: 'Ошибка!',
                        type: 'error'
                    }
                    this.change_alert(alert)
                    // setTimeout(() => {
                    //     this.clear_alert()
                    // }, 5000)
                    this.change_recovery_password(false)
                }
                // let payload = {
                //     request: 'auth/reset-password',
                //     body: this.form
                // }
                // await this.put_request(payload)
                // if(this.alert.type == 'success') {
                //     this.change_recovery_password(false)
                // }
            }
        },
    },
    watch: {
        'form.username'() {
            if(this.form.username.length == 12) {
                this.statusButton.disabled = false
            } else this.statusButton.disabled = true
        }
    }
}
</script>