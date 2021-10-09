<template>
    <main class="q-px-lg">
        <app-content-sidebar />
        <q-separator vertical color="grey-12" />
        <section class="q-mt-lg q-ml-lg column">
            <q-carousel
                v-model="slideID"
                class="full-width"
                animated
                infinite
                :autoplay="autoplay"
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
            <q-btn unelevated no-caps :ripple="false" class="content__button q-btn-no-hover-bg self-end" padding="xs xl">
                <span class="q-mr-xs">{{ t('totalPromotions') }} </span>
                <span class="q-pl-xs text-grey-6" v-text="promotionsCount" />
            </q-btn>
            <p class="text-h6 q-mt-md">
                {{ t('goodsCategory') }}
                <q-btn label="Add product (test button)" dense unelevated outline @click="isAddDialogOpened = !isAddDialogOpened" />
            </p>
            <div class="flex wrap content-start">
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

<script>
import AppContentSidebar from './AppContentSidebar'
import { ref, computed, reactive } from 'vue'
import Product from '../components/Product'
import { useI18n } from 'vue-i18n'
export default {
    name: 'AppContent',
    components: { Product, AppContentSidebar },
    setup() {
        const form = reactive({
            titleRU: '',
            titleUA: '',
            logoURL: '',
            price: 0,
            favorite: false,
            endings: false,
            discountFrom: 0,
        })
        const autoplay = ref(true),
            isAddDialogOpened = ref(false),
            productMaxColumns = ref(null),
            { t, locale } = useI18n(),
            slides = [
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
            ],
            slideID = ref(slides[0].id)
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
        const displayedProductMultiplier = ref(1)
        const displayedProductList = computed(() => productList.value.slice(0, productMaxColumns.value * displayedProductMultiplier.value))
        const productWidth = computed(() => 100 / productMaxColumns.value + '%')
        function onResize(size) {
            productMaxColumns.value = Math.floor(size.width / 169)
        }
        function openPageURL(page) {
            window.open(page, '_self')
        }
        function onProductAdd() {
            productList.value.push(form)
        }
        return {
            promotionsCount: 894,
            openPageURL,
            onProductAdd,
            onResize,
            displayedProductList,
            displayedProductMultiplier,
            productMaxColumns,
            productList,
            productWidth,
            form,
            slideID,
            slides,
            locale,
            autoplay,
            isAddDialogOpened,
            t,
        }
    },
}
</script>

<style lang="stylus">
main
    display grid
    grid-template-columns 300px 1px minmax(741px, 1251px)
    justify-content center
    min-width min-content
    .content__button
        border-radius 0 0 3px 3px !important
        border 1px solid #e0e0e0
        border-top none
        color $app__text-primary
        &:hover
            color $app__text-hover
    .no-left-border
        border-left-width 0 !important
</style>
<i18n lang="yaml">
ru:
    goodsCategory: 'Товары'
    totalPromotions: 'Все акции'
ua:
    goodsCategory: 'Товари'
    totalPromotions: 'Всі акції'
</i18n>
