<template>
    <div>
        <div class="p-4">
            <Title>
                Ваш действующий пароль будет изменен и будет отправлен временный пароль на указанный номер в виде смс.
            </Title>
            <Title>
                Отправить временный пароль?
            </Title>
            <div class="mt-4 mb-2 flex items-center gap-4 justify-center">
                <div class="w-fit">
                    <ButtonPrimary @click="get_confirm_password">
                        Да
                    </ButtonPrimary>
                </div>
                <div class="w-fit">
                    <ButtonPrimary @click="confirmation_recovery_password(false)">
                        Нет
                    </ButtonPrimary>
                </div>
            </div>
            <Text>
                Примечание: Вам необходимо изменить пароль в течении 30 минут с момента получения временного пароля в виде смс, по истечению 30 минут пароль будет не действительным. Пароль служит только для первого входа, вам необходимо будет сразу изменить на собственный вариант пароля, который будет действовать в течении 30 дней
            </Text>
        </div>
        <div class="p-[3.2px] border-t border-light-gray text-right">
            <ButtonClose @click="confirmation_recovery_password(false)">
                Закрыть
            </ButtonClose>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import Title from '@/components/ui/titles/base-black.vue'
import ButtonPrimary from '@/components/ui/buttons/primary.vue'
import ButtonClose from '@/components/ui/buttons/error.vue'
import Text from '@/components/ui/texts/xs.vue'
export default {
    name: 'BodyConfirmRecoveryPasswordFormComponent',
    components: {
        Title,
        ButtonPrimary,
        Text,
        ButtonClose
    },
    methods: {
        ...mapMutations({
            confirmation_recovery_password: 'recoveryPassword/CONFIRMATION_RECOVERY_PASSWORD'
        }),
        get_confirm_password() {
            console.log('Запрос отправки временного пароля');
        }
    }
}
</script>