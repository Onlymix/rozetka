<template>
    <div class="header-wrapper q-mx-auto">
        <q-btn icon="menu" unelevated :ripple="false" size="lg" dense @click="sidebarIsOpened = !sidebarIsOpened" />
        <a href="#" class="h-logo">
            <svg-icon
                :icon-id="$q.screen.width > 1280 ? 'icon-logo-Main' : 'icon-logo-Main-small'"
                :w="$q.screen.width > 1280 ? '240px' : '40px'"
                h="40px"
            />
        </a>
        <q-btn
            class="h-catalog"
            icon="widgets"
            :label="t('catalog')"
            unelevated
            :ripple="false"
            no-caps
            style="background-color: hsla(0, 0%, 100%, 0.2)"
        />
        <q-input v-model="search" outlined dense class="h-search" :placeholder="$q.screen.lt.md">
            <!--        <q-input v-model="search" outlined dense class="search col-grow" :placeholder="t('searchPlaceholder')">-->
            <template v-if="!$q.screen.lt.sm" #prepend>
                <q-icon name="search" />
            </template>
            <template #append>
                <q-icon v-if="search !== ''" name="close" class="cursor-pointer" @click="search = ''" />
                <template v-if="!$q.screen.lt.sm">
                    <q-separator vertical inset class="q-mx-sm" />
                    <q-btn icon="mic" size="sm" dense unelevated :ripple="false" />
                </template>
            </template>
            <template v-if="!$q.screen.lt.sm" #after>
                <q-btn :label="t('searchButton')" unelevated color="green" no-caps style="border-radius: 0 3px 3px 0; height: 100%" />
            </template>
        </q-input>
        <lang-bar class="h-lang" />
        <q-btn dense unelevated :ripple="false" class="reset-line-height h-premium" no-caps padding="2px" size="10px">
            <div>
                <p class="q-my-xs">{{ t('premium') }}</p>
                <svg-icon icon-id="icon-premium" w="66px" h="20px" />
            </div>
        </q-btn>
        <q-btn class="h-person" icon="person" unelevated :ripple="false" size="lg" dense />
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
    display: grid;
    grid-template-columns: repeat(3, auto) 1fr repeat(4, auto);
    grid-template-areas: ". logo catalog search lang premium person ."
    align-items center
    grid-gap 1rem
    height 72px
    max-width 1600px
    .h-logo
        grid-area logo
    .h-catalog
        grid-area catalog
    .h-search
        grid-area search
        .q-field__control
            background-color #fff
            border-radius 3px 0 0 3px
            &:after,
            &:before
                border none !important
            @media (max-width 768px)
                border-radius 3px
        .q-field__after
            padding 0
    .h-lang
        grid-area lang
    .h-premium
        grid-area premium
    .h-person
        grid-area person
    @media only screen and (min-width: 768px) and (max-width: 1024px)
        grid-template-areas: ". logo search search search search person ."
        .h-catalog,
        .h-lang,
        .h-premium
            display none
    @media only screen and (max-width 767px)
        grid-template-areas: ". search search search search search search ."
        .h-catalog,
        .h-lang,
        .h-premium,
        .h-logo,
        .h-person
            display none
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
