<template>
<div class="w-full h-full flex items-center">
    <div class="hidden lg:block relative w-1/2">
        <div class="center w-[400px] h-[94px]">
            <img src="@/assets/img/logo.webp" alt="Logo">
        </div>
    </div>
    <div class="w-full lg:w-1/2 px-4 py-12">
        <div class="flex flex-col gap-4 text-center">
            <div class="block lg:hidden w-[200px] h-[50px] mx-auto">
                <img src="@/assets/img/logo.webp" alt="Logo">
            </div>
            <Title>
                Авторизация в Retail Management System
            </Title>
            <Text>
                Авторизация пользователя
            </Text>
        </div>
        <div class="w-full sm:w-3/4 mx-auto flex flex-col gap-4 mt-6">
            <!-- <Default
            id="username"
            placeholder="Логин"
            v-model="form.username"
            type="latin&number&Probel"/> -->
            <Phone
            id="phone"
            label="Логин"
            v-model="form.username"/>
            <Password
            id="password"
            placeholder="Пароль"
            v-model="form.password"
            />
            <Text class="cursor-pointer"
            @click="change_recovery_password(true)">
                Забыли пароль?
            </Text>
            <ButtonPrimary
            :disabled="authButton.disabled"
            :active="authButton.active"
            @click="auth">
                Авторизовать
            </ButtonPrimary>
        </div>
    </div>
</div>
</template>
<script>
import axios from '@/axios'
import {mapMutations} from 'vuex'
import Title from '@/components/ui/texts/ExtraBold-Vblack-3xl1.vue'
import ButtonPrimary from '@/components/ui/buttons/primary.vue'
import Password from '@/components/ui/inputs/password.vue'
import Text from '@/components/ui/texts/Bold-Vgray-Base.vue'
import Phone from '@/components/ui/inputs/phone.vue'
export default {
    name: 'LoginPageComponent',
    components: {
        Title,
        ButtonPrimary,
        Password,
        Text,
        Phone
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            authButton: {
                disabled: true,
                active: false
            },
        }
    },
    methods: {
        ...mapMutations({
            change_recovery_password: 'recoveryPassword/CHANGE_RECOVERY_PASSWORD',
            change_password: 'changePassword/CHANGE_PASSWORD',
            change_state: 'CHANGE_STATE',
            change_alert: 'Alert/CHANGE_ALERT',
            clear_alert: 'Alert/CLEAR_ALERT'
        }),
        async auth() {
            if(!this.authButton.disabled) {
                if(this.form.password.length < 7) {
                    let password = {
                        isShow: true,
                        msg: 'Длина минимального пароля 7 символов',
                        type: 'error'
                    }
                    this.change_alert(password)
                } else {
                    let alert = {
                        isShow: true,
                        msg: 'Идет загрузка, подождите...',
                        type: 'loaded'
                    }
                    this.change_alert(alert)
                    try {
                        let res = await axios.post('auth/login', this.form)
                        localStorage.setItem('privileges', JSON.stringify(res.data.privileges))
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('user', res.data.username)
                        localStorage.setItem('tokenTime', res.data.tokenStartTime)
                        let privileges = {
                            key: 'privileges',
                            body: localStorage.getItem('privileges')
                        }
                        privileges.body = JSON.parse(privileges.body)
                        this.change_state(privileges)
                        if(res.data.passwordType == 'TEMPORARY') {
                            this.clear_alert()
                            this.change_password(true)
                        } else {
                            this.$router.push('/main')
                            let alert = {
                                isShow: true,
                                msg: 'Успешно!',
                                type: 'success'
                            }
                            this.change_alert(alert)
                            setTimeout(() => {
                                this.clear_alert()
                            }, 1000)
                        }
                    }catch(err) {
                        let alert = {
                            isShow: true,
                            msg: err.response.data.message,
                            type: 'error'
                        }
                        this.change_alert(alert)
                        // setTimeout(() => {
                        //     this.clear_alert()
                        // }, 2000)
                    }
                }
            }
        },
    },
    watch: {
        form: {
            handler(val) {
                if(Object.values(val).filter(f => f == '').length) {
                    this.authButton.disabled = true
                } else this.authButton.disabled = false
            },
            deep: true
        }
    }
}
</script>