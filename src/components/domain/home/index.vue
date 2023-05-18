<template>
    <Header title="Авторизация абонента"/>
    <div class="center w-4/5 sm:w-[427px] flex flex-col gap-4 sm:gap-8">
        <Title class="text-center">
            Вход в профиль
        </Title>
        <Phone
        id="phone"
        label="Номер телефона"
        placeholder="998777777777"
        v-model="abonent.phoneNumber"/>
        <ButtonPrimary
        :disabled="loginButton.disabled"
        :active="loginButton.active"
        @click="auth">
            Авторизовать
        </ButtonPrimary>
    </div>
</template>
<script>
import Header from '@/components/ui/header.vue'
import Title from '@/components/ui/texts/ExtraBold-Vblack-3xl1.vue'
import Phone from '@/components/ui/inputs/phone.vue'
import ButtonPrimary from '@/components/ui/buttons/primary.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    name: 'HomePageComponent',
    components: {
        Title, Header, Phone, ButtonPrimary
    },
    data() {
        return {
            loginButton: {
                disabled: true,
                active: false
            }
        }
    },
    computed: {
        ...mapState({
            page: state => state.page,
            abonent: state => state.abonent
        }),
    },
    methods: {
        ...mapMutations({
            show_isConfirmation: 'SMSconfirmation/CHANGE_CONFIRMATION'
        }),
        ...mapActions({
            get_page: 'get_pagedata'
        }),
        async auth() {
            if(!this.loginButton.disabled) {
                let payload = {
                request: `otp/read?phoneNumber=${this.abonent.phoneNumber}`,
                body: {},
                key: 'page'
                }
                await this.get_page(payload)
                if(this.page.success) {
                    this.show_isConfirmation(true)
                }
            }
        }
    },
    watch: {
        'abonent.phoneNumber'() {
            if(this.abonent.phoneNumber.length == 12) {
                this.loginButton.disabled = false
            } else this.loginButton.disabled = true
        }
    },
}
</script>