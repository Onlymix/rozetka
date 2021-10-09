<template>
    <div class="header-wrapper items-center row q-gutter-x-md q-mx-auto">
        <q-btn icon="menu" unelevated :ripple="false" size="lg" dense @click="sidebarIsOpened = !sidebarIsOpened" />
        <a href="#" class="reset-line-height"><svg-icon icon-id="icon-logo-Main" w="240px" h="40px" /></a>
        <q-btn icon="widgets" :label="t('catalog')" unelevated :ripple="false" no-caps style="background-color: hsla(0, 0%, 100%, 0.2)" />
        <q-input v-model="search" outlined dense class="search col-grow" :placeholder="t('searchPlaceholder')">
            <template #prepend>
                <q-icon name="search" />
            </template>
            <template #append>
                <q-icon v-if="search !== ''" name="close" class="cursor-pointer" @click="search = ''" />
                <q-separator vertical inset class="q-mx-sm" />
                <q-btn icon="mic" size="sm" dense unelevated :ripple="false" />
            </template>
            <template #after>
                <q-btn :label="t('searchButton')" unelevated color="green" no-caps style="border-radius: 0 3px 3px 0; height: 100%" />
            </template>
        </q-input>
        <lang-bar />
        <q-btn dense unelevated :ripple="false" class="reset-line-height" no-caps padding="2px" size="10px">
            <div>
                <p class="q-my-xs">{{ t('premium') }}</p>
                <svg-icon icon-id="icon-premium" w="66px" h="20px" />
            </div>
        </q-btn>
        <q-btn icon="person" unelevated :ripple="false" size="lg" dense />
        <q-btn icon="shopping_cart" unelevated :ripple="false" size="lg" dense />
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import SvgIcon from '../components/SvgIcon'
import { useI18n } from 'vue-i18n'
import LangBar from '../components/LangBar'

export default {
    components: { LangBar, SvgIcon },
    props: {
        modelValue: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { t } = useI18n()
        const sidebarIsOpened = computed({
            get: () => props.modelValue,
            set: (val) => emit('update:modelValue', val),
        })
        return {
            t,
            sidebarIsOpened,
            search: ref(''),
        }
    },
}
</script>
<style lang="stylus">
.header-wrapper
    height 72px
    min-width 1090px
    max-width 1600px
    background-color inherit
    .search
        .q-field__control
            background-color #fff
            border-radius 3px 0 0 3px
            &:after,
            &:before
                border none !important
        .q-field__after
            padding 0
</style>
<i18n lang="yaml">
ru:
    premium: 'Попробуйте'
    searchButton: 'Найти'
    searchPlaceholder: 'Я ищу...'
    catalog: 'Каталог'
ua:
    premium: 'Спробуйте'
    searchButton: 'Знайти'
    searchPlaceholder: 'Я шукаю...'
    catalog: 'Каталог'
</i18n>
