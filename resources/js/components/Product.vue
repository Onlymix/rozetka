<template>
    <div class="q-pa-md relative-position borders column">
        <q-btn
            unelevated
            :icon="isFavorite ? 'favorite' : 'favorite_border'"
            text-color="amber-8"
            :ripple="false"
            class="q-btn-no-hover-bg absolute"
            style="top: 2px; right: 2px"
            size="1.2em"
            padding="2px"
            @click="isFavorite = !isFavorite"
        />
        <a href="#" class="reset-link-style q-mb-md">
            <div class="items-center justify-center flex" style="height: 170px">
                <img :src="logoURL" alt="logo" class="logo" />
            </div>
            <div class="title__hover" style="font-size: 1.05em" v-text="t('title')" />
        </a>
        <div v-if="discountFrom" class="q-mt-auto text-strike text-grey-6">
            <span class="q-pr-xs" style="font-size: 1.15em" v-text="discountFrom + ' ₴'" />
        </div>
        <div :class="{ 'text-red': discountFrom, 'q-mt-auto': !discountFrom }">
            <span class="q-pr-xs" style="font-size: 1.85em" v-text="price" />
            <span class="" style="font-size: 1.35em" v-text="'₴'" />
        </div>
        <span v-if="endings" class="text-red" style="font-size: 0.8em" v-text="t('ending')" />
    </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
    props: {
        titleRU: { type: String, required: true },
        titleUA: { type: String, required: true },
        logoURL: { type: String, required: true },
        discountFrom: { type: Number, required: false, default: 0 },
        price: { type: Number, required: true },
        favorite: { type: Boolean, required: false },
        endings: { type: Boolean, required: false },
        last: { type: Boolean, required: false },
    },
    setup(props) {
        const { t } = useI18n({
            messages: {
                ru: {
                    title: props.titleRU,
                },
                ua: {
                    title: props.titleUA,
                },
            },
        })
        return { t, isFavorite: ref(props.favorite) }
    },
}
</script>

<style lang="stylus" scoped>
.title__hover:hover
    color $app__text-hover
    text-decoration underline
    cursor pointer
.borders
    border 0 solid #e7e7e7
    border-bottom-width 1px
    border-left-width 1px
.logo
    max-width 140px
    max-height 140px
</style>
<i18n>
{
    "ru": {
        "ending": "Заканчивается"
    },
    "ua": {
        "ending": "Закінчується"
    }
}
</i18n>
