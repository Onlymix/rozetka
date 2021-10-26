<template>
    <main class="q-mx-auto row">
        <app-content-sidebar class="gt-sm sidebar" />
        <section class="q-mt-lt column col items-start justify-start" :class="{ 'q-ml-lg': $q.screen.gt.sm }">
            <q-responsive :ratio="3" class="full-width">
                <q-carousel
                    v-model="slideID"
                    animated
                    infinite
                    :autoplay="true"
                    arrows
                    control-color="primary"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                    @mouseenter="autoplay = false"
                    @mouseleave="autoplay = true"
                >
                    <q-carousel-slide
                        v-for="item in slides"
                        :key="item.id"
                        :name="item.id"
                        :img-src="`/img/slider/${locale}/${item.id}.jpg`"
                        class="cursor-pointer"
                        @click="openPageURL(item.url)"
                    />
                </q-carousel>
            </q-responsive>
            <q-btn
                unelevated
                no-caps
                :ripple="false"
                class="content__button q-btn-no-hover-bg self-end"
                padding="xs xl"
                :class="{ hidden: $q.screen.lt.sm }"
            >
                <span class="q-mr-xs">{{ t('totalPromotions') }} </span>
                <span class="q-pl-xs text-grey-6" v-text="promotionsCount" />
            </q-btn>
            <p class="text-h6 q-mt-md">
                {{ t('goodsCategory') }}
                <q-btn label="Add product (test button)" dense unelevated outline @click="isAddDialogOpened = !isAddDialogOpened" />
            </p>
            <div class="flex wrap content-start full-width">
                <product
                    v-for="(product, index) in displayedProductList"
                    :key="index"
                    v-bind="product"
                    :last="index === displayedProductList.length - 1"
                    :style="{ width: productWidth }"
                    :class="{ 'no-left-border': index % productMaxColumns === 0 }"
                />
                <q-btn
                    v-if="displayedProductList.length < productList.length"
                    :style="{ width: productWidth }"
                    class="q-ml-auto content__button"
                    unelevated
                    label="Показать еще "
                    @click="displayedProductMultiplier += 2"
                />
            </div>
            <q-resize-observer @resize="onResize" />
        </section>
    </main>
    <q-dialog v-model="isAddDialogOpened">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div style="font-size: 1.2em">Add some goods 4 test displaying content</div>
                <q-btn v-close-popup class="q-ml-md" icon="close" flat round dense />
            </q-card-section>

            <q-card-section>
                <q-form class="q-gutter-md" style="min-width: 300px" @submit="onProductAdd">
                    <q-input v-model="form.titleRU" outlined label="title ru" />
                    <q-input v-model="form.titleUA" outlined label="title ua" />
                    <q-input v-model="form.logoURL" outlined label="logo url" />
                    <q-input v-model.number="form.price" type="number" outlined label="price" />
                    <q-input
                        v-model.number="form.discountFrom"
                        type="number"
                        outlined
                        label="discounted from"
                        hint="leave 0 if discount doesn't exist"
                    />
                    <q-list dense>
                        <q-item v-ripple tag="label" class="no-padding">
                            <q-item-section avatar class="col-shrink q-pr-sm">
                                <q-checkbox v-model="form.favorite" dense />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>favorite</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item v-ripple tag="label" class="no-padding">
                            <q-item-section avatar class="col-shrink q-pr-sm">
                                <q-checkbox v-model="form.endings" dense />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>endings</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                    <div>
                        <q-btn label="Submit" type="submit" color="primary" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import AppContentSidebar from './AppContentSidebar.vue'
import { ref, computed, reactive } from 'vue'
import Product from '../components/Product.vue'
import { useI18n } from 'vue-i18n'

/* form data to add product */
const form = reactive({
    titleRU: '',
    titleUA: '',
    logoURL: '',
    price: 0,
    favorite: false,
    endings: false,
    discountFrom: 0,
})
const { t, locale } = useI18n()
/* show menu add products */
const isAddDialogOpened = ref(false)
/* max displayed count */
const productMaxColumns = ref(0)
/* promotion slides (simulation retrieved from db) */
const slides = [
    {
        id: 0,
        url: '#',
    },
    {
        id: 1,
        url: '#',
    },
    {
        id: 2,
        url: '#',
    },
]
/* amount of promotion (simulation retrieved from db) */
const promotionsCount = 894
/* total products list (simulation retrieved from db) */
const productList = ref([
    {
        titleRU: 'Отладочная плата Arduino Nano',
        titleUA: 'Відладочна плата Arduino Nano',
        logoURL: '/img/product1.jpg',
        price: 202,
        favorite: true,
        endings: true,
        discountFrom: 305,
    },
])
/* current displayed slide */
const slideID = ref(slides[0].id)
/* displayed product rows multiplier */
const displayedProductMultiplier = ref(1)

/* computed displayed products */
const displayedProductList = computed(() => productList.value.slice(0, productMaxColumns.value * displayedProductMultiplier.value))
const productWidth = computed(() => 100 / productMaxColumns.value + '%')

function onResize(size: { width: number; height: number }) {
    productMaxColumns.value = Math.floor(size.width / 160)
}
function openPageURL(page: string) {
    window.open(page, '_self')
}
function onProductAdd() {
    productList.value.push(form)
}
</script>

<style lang="stylus">
main
    max-width 1600px
    .sidebar
        border-color #EEEEEE
        border-width 0 1px 0 0
        border-style solid
        width 300px
    .content__button
        border-radius 0 0 3px 3px !important
        border 1px solid #e0e0e0
        border-top none
        color $app__text-primary
        &:hover
            color $app__text-hover
    .no-left-border
        border-left-width 0 !important
    @media only screen and (min-width 768px) and (max-width 1024px)
        padding 0 8px 0 8px
    @media only screen and (min-width 1024px)
        padding 0 24px 0 24px
</style>
<i18n lang="yaml">
ru:
    goodsCategory: 'Товары'
    totalPromotions: 'Все акции'
ua:
    goodsCategory: 'Товари'
    totalPromotions: 'Всі акції'
</i18n>
