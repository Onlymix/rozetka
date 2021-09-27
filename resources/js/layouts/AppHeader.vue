<template>
    <div class="header-wrapper items-center full-height row q-gutter-x-md">
        <q-btn icon="menu" unelevated :ripple="false" size="lg" dense @click="sidebarIsOpened = !sidebarIsOpened" />
        <a href="#" class="reset-line-height"><svg-icon icon-id="icon-logo-Main" w="240px" h="40px" /></a>
        <q-btn icon="widgets" label="Каталог" unelevated :ripple="false" no-caps style="background-color: hsla(0, 0%, 100%, 0.2)" />
        <q-input v-model="search" outlined dense class="search col-grow" placeholder="Я ищу...">
            <template #prepend>
                <q-icon name="search" />
            </template>
            <template #append>
                <q-icon v-if="search !== ''" name="close" class="cursor-pointer" @click="search = ''" />
                <q-separator vertical inset class="q-mx-sm" />
                <q-btn icon="mic" size="sm" dense unelevated :ripple="false" />
            </template>
            <template #after>
                <q-btn label="Найти" unelevated color="green" no-caps style="border-radius: 0 3px 3px 0; height: 100%" />
            </template>
        </q-input>
        <div class="language flex text-subtitle1 text-uppercase text-grey-8">
            <a href="#" :class="{ 'active-language': 'ru' === language }" @click="setLanguage" v-text="'ru'" />
            <q-separator vertical color="grey-8" class="q-mx-xs" />
            <a href="#" :class="{ 'active-language': 'ua' === language }" @click="setLanguage" v-text="'ua'" />
        </div>
        <q-btn dense unelevated :ripple="false" class="reset-line-height" no-caps padding="2px" size="10px">
            <div>
                <p class="q-my-xs">Попробуйте</p>
                <svg-icon icon-id="icon-premium" w="66px" h="20px" />
            </div>
        </q-btn>
        <q-btn icon="person" unelevated :ripple="false" size="lg" dense />
        <q-btn icon="shopping_cart" unelevated :ripple="false" size="lg" dense style="margin-left: 0" />
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import SvgIcon from '../components/SvgIcon'
export default {
    components: { SvgIcon },
    props: {
        modelValue: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const language = ref('ru')
        const sidebarIsOpened = computed({
            get: () => props.modelValue,
            set: (val) => emit('update:modelValue', val),
        })
        return {
            language,
            sidebarIsOpened,
            setLanguage(e) {
                if (e.target.innerText.toLowerCase() !== language.value) language.value = e.target.innerText.toLowerCase()
            },
            search: ref(''),
        }
    },
}
</script>

<style lang="scss">
.header-wrapper {
    min-width: 1001px;
    max-width: 1600px;
    background-color: inherit;
    .search {
        .q-field__control {
            background-color: #fff;
            border-radius: 3px 0 0 3px;

            &:after,
            &:before {
                border: none !important;
            }
        }
        .q-field__after {
            padding: 0;
        }
    }

    .language {
        a {
            text-decoration: inherit;
            cursor: pointer;
            color: #fff;

            &:hover {
                color: #f84147;
            }
        }
        .active-language {
            color: #797878;
            cursor: default;

            &:hover {
                color: #797878;
            }
        }
    }
}
</style>
