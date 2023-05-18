<template>
    <div class="flex flex-col gap-4 p-4">
        <Input
        id="oldPasswod"
        label="Текущий пароль"
        placeholder="пароль"
        v-model="form.oldPassword"/>
        <Input
        id="newPasswod"
        label="Новый пароль"
        placeholder="новый пароль"
        v-model="form.newPassword"/>
        <Input
        id="confirmNewPasswod"
        label="Подтвердите пароль"
        v-model="form.confirmNewPassword"/>
        <Button :disabled="statusButton.disabled" @click="changePassword">
            Изменить пароль
        </Button>
        <div class="px-[3.2px] pt-2 border-t border-light-gray text-right">
            <ButtonClose @click="change_password(false)">
                Закрыть
            </ButtonClose>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Input from '@/components/ui/inputs/password.vue'
import Button from '@/components/ui/buttons/primary.vue'
import ButtonClose from '@/components/ui/buttons/error.vue'
import api from '@/api'
export default {
    name: 'BodyChangePasswordApplicationComponent',
    components: {
        Input, Button, ButtonClose
    },
    computed: {
        ...mapState({
            alert: state => state.Alert.alert
        })
    },
    data() {
        return {
            form: {
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            },
            statusButton: {
                disabled: true,
                active: false
            }
        }
    },
    methods: {
        ...mapMutations({
            change_password: 'changePassword/CHANGE_PASSWORD',
            change_alert: 'Alert/CHANGE_ALERT',
            clear_alert: 'Alert/CLEAR_ALERT',
            loaded_alert: 'Alert/LOADED_ALERT'
        }),
        ...mapActions({
            put_request: 'put_request'
        }),
        async changePassword() {
            if(!this.statusButton.disabled) {
                if(this.form.newPassword !== this.form.confirmNewPassword) {
                    let alert = {
                        isShow: true,
                        msg: 'Пароль должны совпадать!',
                        type: 'error'
                    }
                    this.change_alert(alert)
                    // setTimeout(() => {
                    //     this.clear_alert()
                    // }, 5000)
                } else {
                    this.error = ''
                    this.newPassword()
                    // let payload = {
                    //     request: 'seller-info/change-password',
                    //     body: {
                    //         oldPassword: this.form.oldPassword,
                    //         newPassword: this.form.newPassword,
                    //         username: window.localStorage.getItem('user')
                    //     }
                    // }
                    // if(this.$route.path == '/') {
                    //         await this.put_request(payload)
                    //         if(this.alert.type == 'success') {
                    //             if(this.$route.path == '/') {
                    //                 this.$router.push('/main')
                    //             }
                    //             this.change_password(false)
                    //         } else {
                    //            let alert = {
                    //                 isShow: true,
                    //                 msg: 'Пароль должен быть длиной больше 6 символов и содержать минимум 1 заглавную букву, 1 маленькую и 1 цифру',
                    //                 type: 'error'
                    //             }
                    //             this.change_alert(alert)
                    //             setTimeout(() => {
                    //                 this.clear_alert()
                    //             }, 5000) 
                    //         }
                    // } else {
                    //     this.newPassword()
                    // }
                }
                
            }
        },
        async newPassword() {
            try {
                let token = localStorage.getItem('token')
                let res = await api.put('seller-info/change-password', {
                    oldPassword: this.form.oldPassword,
                    newPassword: this.form.newPassword,
                    username: window.localStorage.getItem('user')
                }, {
                    headers: {
                        Authorization: token,
                    }
                })
                this.loaded_alert()
                let alert = {
                    isShow: true,
                    msg: 'Успешно!',
                    type: 'success'
                }
                this.change_alert(alert)
                setTimeout(() => {
                    this.clear_alert()
                }, 5000)
                this.change_password(false)
                if(res.status == 200 && this.$route.path == '/') {
                    this.$router.push('/main')
                }
            }catch(err) {
                if(err.response.status == 400) {
                    let alert = {
                        isShow: true,
                        msg: 'Пароль должен быть длиной больше 7 символов и содержать минимум 1 заглавную букву, 1 маленькую и 1 цифру',
                        type: 'error'
                    }
                    this.change_alert(alert)
                    // setTimeout(() => {
                    //     this.clear_alert()
                    // }, 5000)
                } else {
                    let alert = {
                        isShow: true,
                        msg: err.response.data.message,
                        type: 'error'
                    }
                    this.change_alert(alert)
                    // setTimeout(() => {
                    //     this.clear_alert()
                    // }, 5000)
                }
            }
        },
    },
    watch: {
        form: {
            handler(val) {
                if(Object.values(val).filter(f => f == '').length) {
                    this.statusButton.disabled = true
                } else this.statusButton.disabled = false
            },
            deep: true
        }
    }
}
</script>