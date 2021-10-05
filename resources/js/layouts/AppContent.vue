<template>
    <main class="q-px-lg">
        <app-content-sidebar />
        <q-separator vertical color="grey-12" />
        <section class="q-mt-lg q-ml-lg column">
            <q-carousel
                v-model="slide"
                class="full-width"
                animated
                infinite
                :autoplay="autoplay"
                arrows
                transition-prev="slide-right"
                transition-next="slide-left"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = true"
            >
                <q-carousel-slide :name="1" img-src="/img/slider1.jpg" class="cursor-pointer" @click="openPageURL('#')" />
                <q-carousel-slide :name="2" img-src="/img/slider2.jpg" class="cursor-pointer" @click="openPageURL('#')" />
                <q-carousel-slide :name="3" img-src="/img/slider3.jpg" class="cursor-pointer" @click="openPageURL('#')" />
            </q-carousel>
            <q-btn
                label="Все акции"
                unelevated
                no-caps
                :ripple="false"
                class="content__button q-btn-no-hover-bg self-end"
                padding="xs xl"
            />
            <p class="text-h6">
                Товары
                <q-btn label="Add product (test button)" dense unelevated outline @click="isAddDialogOpened = !isAddDialogOpened" />
            </p>
            <div class="flex wrap content-start">
                <product
                    v-for="(product, index) in displayedProductList"
                    :key="product.title"
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
                    <q-input v-model="form.title" outlined label="title" />
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
export default {
    name: 'AppContent',
    components: { Product, AppContentSidebar },
    setup() {
        const form = reactive({
            title: '',
            logoURL: '',
            price: 0,
            favorite: false,
            endings: false,
            discountFrom: 0,
        })
        const slide = ref(1),
            autoplay = ref(true),
            isAddDialogOpened = ref(false),
            productMaxColumns = ref(null)
        const productList = ref([
            {
                title: 'Отладочная плата Arduino Nano',
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
            productList.value.push({
                title: form.title,
                logoURL: form.logoURL,
                price: form.price,
                favorite: form.favorite,
                discountFrom: form.discountFrom,
                endings: form.endings,
            })
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
            slide,
            autoplay,
            isAddDialogOpened,
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
        :hover
            color $app__text-hover
    .no-left-border
        border-left-width 0 !important
</style>
