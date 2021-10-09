<template>
    <div class="language flex text-subtitle1 text-uppercase text-grey-8">
        <a href="#" :class="{ 'active-language': 'ru' === language }" @click="setLanguage">ru</a>
        <q-separator vertical color="grey-8" class="q-mx-xs" />
        <a href="#" :class="{ 'active-language': 'ua' === language }" @click="setLanguage">ua</a>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export default {
    setup() {
        const { locale } = useI18n({
                useScope: 'global',
            }),
            language = computed({
                get: () => locale.value,
                set: (val) => {
                    locale.value = val.toString()
                    localStorage.setItem('lang', val)
                },
            })
        function setLanguage(e) {
            if (e.target.innerText.toLowerCase() !== language.value) language.value = e.target.innerText.toLowerCase()
        }
        return { language, setLanguage }
    },
}
</script>

<style scoped lang="stylus">
.language
    a
        text-decoration inherit
        cursor pointer
        color #fff
        &:hover
            color: #f84147
    .active-language
        color #797878
        cursor default
        &:hover
            color #797878
</style>
