<template>
    <aside style="width: 300px">
        <!--region done-->
        <q-list class="text-blue-8 q-mt-lg">
            <q-item v-for="item in menuLinks" :key="item.id" clickable manual-focus :to="item.url" dense>
                <q-item-section avatar class="col-shrink no-padding">
                    <q-icon :name="item.icon" color="grey-13" class="q-px-xs" />
                </q-item-section>
                <q-item-section v-text="item.text" />
            </q-item>
            <q-separator color="grey-12" class="q-mt-lg" />
            <q-item clickable manual-focus>
                <q-item-section avatar class="col-shrink no-padding">
                    <q-icon name="help_outline" color="grey-13" class="q-px-xs" />
                </q-item-section>
                <q-item-section style="text-decoration: none" v-text="'Справочный центр'" />
            </q-item>
        </q-list>
        <q-separator color="grey-12" />
        <div class="bg-grey-11 text-center sidebar-padding">
            <div class="text-h6 text-weight-thin">Добро пожаловать!</div>
            <div style="font-size: 0.8em" class="q-my-sm">Войдите, чтобы получать рекомендации, персональные бонусы и скидки.</div>
            <q-btn label="Войдите в личный кабинет" no-caps text-color="white" style="background: #3e77aa" unelevated />
        </div>
        <q-separator color="grey-12" />
        <div class="apps row q-gutter-md sidebar-padding">
            <span class="text-grey-6 col-12">Устанавливайте наши приложения</span>
            <a href="#"><img alt="Google Play" src="https://xl-static.rozetka.com.ua/assets/img/design/button-google-play-ru.svg" /></a>
            <a href="#"><img alt="AppStore" src="https://xl-static.rozetka.com.ua/assets/img/design/button-appstore-ru.svg" /></a>
        </div>
        <q-separator color="grey-12" />
        <div class="sidebar-padding row q-gutter-sm items-center">
            <div class="text-grey-6 col-12">Мы в социальных сетях</div>
            <q-btn
                v-for="item in socialLinks"
                :key="item.iconId"
                round
                unelevated
                :icon="'svguse:' + item.iconId"
                :style="item.style"
                text-color="white"
                size="0.82em"
                padding="7px"
                :to="item.link"
            />
        </div>
        <q-separator color="grey-12" />
        <q-list class="text-blue-8 q-pb-md" dense>
            <template v-for="item in supportLinks" :key="item.label">
                <q-item-label header class="q-px-lg q-pt-lg q-pb-sm text-subtitle2" v-text="item.label" />
                <q-item
                    v-for="button in item.data"
                    :key="button.text"
                    style="padding: 0 24px 0 24px; min-height: 26px"
                    dense
                    clickable
                    manual-focus
                    :to="button.url"
                >
                    <q-item-section v-text="button.text" />
                </q-item>
            </template>
        </q-list>
        <q-separator color="grey-12" />
        <!--endregion-->
        <div class="copyright flex sidebar-padding q-gutter-sm">
            <span class="text-grey-6">ТМ используется на основании лицензии правообладателя RozetkaLTD.</span>
            <span>© Интернет-магазин «Розетка™» 2001–2021</span>
        </div>
    </aside>
</template>

<script>
export default {
    setup() {
        const supportLinks = [
            {
                label: 'Помощь',
                data: [
                    { text: 'Доставка и оплата', url: '#' },
                    { text: 'Кредит', url: '#' },
                    { text: 'Гарантия', url: '#' },
                    { text: 'Возврат товара', url: '#' },
                    { text: 'Сервисные центры', url: '#' },
                    { text: 'Отследить заказ', url: '#' },
                ],
            },
            {
                label: 'Информация о компании',
                data: [
                    { text: 'О нас', url: '#' },
                    { text: 'Условия использования сайта', url: '#' },
                    { text: 'Вакансии', url: '#' },
                    { text: 'Контакты', url: '#' },
                ],
            },
            {
                label: 'Сервисы',
                data: [
                    { text: 'Бонусный счет', url: '#' },
                    { text: 'Rozetka Premium', url: '#' },
                    { text: 'Подарочные сертификаты', url: '#' },
                    { text: 'Rozetka Обмен', url: '#' },
                    { text: 'Rozetka Travel', url: '#' },
                ],
            },
            {
                label: 'Партнерам',
                data: [
                    { text: 'Франчайзинг', url: '#' },
                    { text: 'Продавать на Розетке', url: '#' },
                    { text: 'Сотрудничество с нами', url: '#' },
                ],
            },
        ]
        const menuLinks = [
            {
                id: 0,
                url: '#',
                icon: 'laptop',
                text: 'Ноутбуки и компьютеры',
            },
            {
                id: 1,
                url: '#',
                icon: 'smartphone',
                text: 'Смартфоны, ТВ и Электроника',
            },
            {
                id: 2,
                url: '#',
                icon: 'sports_esports',
                text: 'Товары для геймеров',
            },
            {
                id: 3,
                url: '#',
                icon: 'more_horiz',
                text: 'etc...',
            },
        ]
        const socialLinks = [
            {
                iconId: '#icon-facebook',
                link: '#',
                style: 'background-color: #506098',
            },
            {
                iconId: '#icon-twitter',
                link: '#',
                style: 'background-color: #76c9fd',
            },
            {
                iconId: '#icon-youtube',
                link: '#',
                style: 'background-color: #e90000',
            },
            {
                iconId: '#icon-instagram',
                link: '#',
                style: 'background: linear-gradient(45deg, #ffb700 14.65%, #ff6800 31.68%, #cb217d 54.72%, #7e00aa 85.35%)',
            },
            {
                iconId: '#icon-viber',
                link: '#',
                style: 'background-color: #7d3daf',
            },
            {
                iconId: '#icon-telegram',
                link: '#',
                style: 'background-color: #08c',
            },
        ]
        return { menuLinks, socialLinks, supportLinks }
    },
}
</script>

<style scoped lang="stylus">
.sidebar-padding
    padding 16px 24px 16px 24px
.q-item
    padding 2px 24px 2px 24px
    font-size 1em
    &:hover .q-item__section--main
        text-decoration underline
        color $app-selected-orange
.apps img
    height 32px
.copyright
    font-size 0.9em
</style>
