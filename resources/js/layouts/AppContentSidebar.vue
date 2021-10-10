<template>
    <aside>
        <q-list class="text-blue-8 q-mt-lg">
            <q-item v-for="item in menuLinks" :key="item.id" clickable manual-focus :to="item.url" dense>
                <q-item-section avatar class="col-shrink no-padding">
                    <q-icon :name="item.icon" color="grey-13" />
                </q-item-section>
                <q-item-section class="q-pl-sm" v-text="t(`mainMenu.${item.i18}`)" />
            </q-item>
            <q-separator color="grey-12" class="q-mt-lg" />
            <q-item clickable manual-focus>
                <q-item-section avatar class="col-shrink no-padding">
                    <q-icon name="help_outline" color="grey-13" />
                </q-item-section>
                <q-item-section class="q-pl-sm" style="text-decoration: none" v-text="t('mainMenu.help')" />
            </q-item>
        </q-list>
        <q-separator color="grey-12" />
        <q-list v-if="user.isLoggedIn">
            <q-item-label header class="q-pb-none q-pl-none text-grey-6">
                <q-icon name="person" color="grey-13" class="q-pr-xs" />
                {{ user.login }}
            </q-item-label>
            <q-item clickable manual-focus dense class="text-blue-8" style="padding-left: 32px" @click="onLogout">
                <q-item-section v-text="t('user.logout')" />
            </q-item>
        </q-list>
        <div v-else class="bg-grey-11 text-center sidebar-padding">
            <div class="text-h6 text-weight-thin" v-text="t('user.welcome')" />
            <div style="font-size: 0.8em" class="q-my-sm" v-text="t('user.description')" />
            <q-btn
                :label="t('user.button')"
                no-caps
                text-color="white"
                style="background: #3e77aa"
                unelevated
                @click="isAuthDialogOpened = !isAuthDialogOpened"
            />
        </div>

        <q-separator color="grey-12" />
        <div class="apps row q-gutter-md sidebar-padding justify-center">
            <span class="text-grey-6 col-12">{{ t('apps') }}</span>
            <a href="#"><svg-icon icon-id="icon-apps-GooglePlay" w="96px" h="32px" /></a>
            <a href="#"><svg-icon icon-id="icon-apps-AppStore" w="96px" h="32px" /></a>
        </div>
        <q-separator color="grey-12" />
        <div class="sidebar-padding row q-gutter-sm items-center">
            <div class="text-grey-6 col-12" v-text="t('socialLinks')" />
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
                <q-item-label header class="q-px-lg q-pt-lg q-pb-sm text-subtitle2" v-text="t(`socialMenu.${item.label}`)" />
                <q-item
                    v-for="button in item.data"
                    :key="button.text"
                    style="padding: 0 24px 0 24px; min-height: 26px"
                    dense
                    clickable
                    manual-focus
                    :to="button.url"
                >
                    <q-item-section v-text="t(`socialMenu.${button.i18}`)" />
                </q-item>
            </template>
        </q-list>
        <q-separator color="grey-12" />
        <div class="copyright sidebar-padding q-gutter-y-sm justify-center">
            <div class="text-center q-gutter-x-md">
                <q-btn unelevated class="no-padding" :ripple="false" @click="masterCard = !masterCard">
                    <svg-icon icon-id="icon-payments-MasterCard" w="72px" h="32px" />
                </q-btn>
                <q-btn unelevated class="no-padding" :ripple="false" @click="visa = !visa">
                    <svg-icon icon-id="icon-payments-Visa" w="72px" h="32px" />
                </q-btn>
            </div>
            <p class="text-grey-6" v-text="t('footer.license')" />
            <span v-text="t('footer.copyright')" /><br />
            <span>2001–2021</span>
        </div>
        <q-dialog v-model="masterCard">
            <q-card style="min-width: 640px">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">MasterCard® SecureCode™</div>
                    <q-space />
                    <q-btn v-close-popup icon="close" flat round dense />
                </q-card-section>

                <q-separator color="grey-4" class="q-mt-sm" />

                <q-card-section>
                    MasterCard® SecureCode™ — это технология, которая обеспечивает Вашу карту MasterCard® или Maestro® дополнительным
                    секретным кодом, защищающим ее от несанкционированного использования во время совершения покупок в интернет-магазинах,
                    участвующих в программе.
                </q-card-section>
                <q-card-section>
                    Чтобы подключить технологию SecureCode, необходимо обратиться в банк, выпустивший Вашу карту. Ваш секретный код будет
                    известен только Вам и Вашему банку. Далее при каждой оплате покупок или услуг в интернет-магазинах, участвующих в
                    программе, Ваш банк предложит Вам ввести данный секретный код, который Вы получите на Ваш мобильный телефон,
                    зарегистрированный в банке. Только после проверки и подтверждения банком данного кода операция по оплате будет
                    произведена. Процедура использования технологии SecureCode так же проста, как введение PIN-кода в банкомате.
                </q-card-section>
                <q-card-section>
                    Введя правильный SecureCode в процессе покупки, Вы подтверждаете, что являетесь авторизованным владельцем карты. Если
                    введен неправильный SecureCode, покупка не будет совершена. Даже если кому-то известен номер Вашей платежной карты, без
                    SecureCode не удастся оплатить покупку в интернет-магазинах, участвующих в программе.
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="visa">
            <q-card style="min-width: 640px">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Verified by Visa</div>
                    <q-space />
                    <q-btn v-close-popup icon="close" flat round dense />
                </q-card-section>

                <q-separator color="grey-4" class="q-mt-sm" />

                <q-card-section>
                    Платежные системы в партнерстве с банками-эмитентами внедряют современные схемы проверки личности держателя карты, чтобы
                    сделать покупки в Интернете более безопасными. Устанавливается специальный пароль для каждой совершаемой операции, и это
                    вселяет в Вас уверенность, что только Вы можете делать такие покупки онлайн. Современные технологические решения
                    необходимы для того, чтобы держатель карты был уверен в безопасности транзакции и в том, что он имеет дело с настоящим
                    (а не «подставным») магазином.
                </q-card-section>
                <q-card-section> Одно из таких технологических решений называется Verified by Visa («Проверено Visa»). </q-card-section>
                <q-card-section>
                    Verified by Visa — это новая система защиты, которая извещает онлайн-торговцев, участвующих в программе, и банки о том,
                    что Вы являетесь настоящим владельцем карточки, когда Вы совершаете онлайн-покупки. Она позволяет Вам использовать
                    персональный пароль для подтверждения Вашей личности и защиты Вашей карточки Visa, когда Вы используете ее в Интернете,
                    вселяя большую уверенность в совершаемых Вами действиях.
                </q-card-section>
                <q-card-section>
                    К технологии Verified by Visa легко подключиться, ее легко использовать, услуга действует для всех карточек Visa.
                </q-card-section>
                <q-card-section> Для активации услуги Verified by Visa для Вашей карты необходимо обратиться в Ваш банк. </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="isAuthDialogOpened">
            <q-card style="min-width: 640px">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6" v-text="authForm.isLogin ? 'Login' : 'Register'" />
                    <q-space />
                    <q-btn v-close-popup icon="close" flat round dense />
                </q-card-section>
                <q-card-section>
                    <q-form class="q-gutter-md" @submit="onSubmit">
                        <q-input v-if="!authForm.isLogin" v-model="authForm.login" filled label="Login" />
                        <q-input v-model="authForm.email" filled type="email" label="Email" />
                        <q-input v-model="authForm.password" filled type="password" label="Password" />
                        <div class="row q-gutter-x-md justify-end">
                            <q-btn
                                :label="authForm.isLogin ? 'Register' : 'Login'"
                                color="primary"
                                @click="authForm.isLogin = !authForm.isLogin"
                            />
                            <q-btn label="Submit" type="submit" color="primary" />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </aside>
</template>

<script setup lang="ts">
import SvgIcon from '../components/SvgIcon.vue'
import { reactive, ref } from 'vue'
import { logout, setLoginState, setToken, setUserData } from '../global'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { injectStrict } from '../ts/utils'
import { UserKey } from '../ts/symbols'

const masterCard = ref(false),
    visa = ref(false),
    user = injectStrict(UserKey),
    isAuthDialogOpened = ref(false),
    authForm = reactive({
        isLogin: true,
        login: '',
        password: '',
        email: '',
    }),
    { t } = useI18n()
function onSubmit() {
    const url = authForm.isLogin ? '/api/auth/login' : '/api/auth/register'
    axios.post(url, { name: authForm.login, password: authForm.password, email: authForm.email }).then((response) => {
        setUserData(response.data.userData)
        setLoginState(response.data.access_token)
        setToken(response.data.access_token, response.data.expires_in)
        setTimeout(() => (isAuthDialogOpened.value = false), 100)
    })
}
function onLogout() {
    logout()
}
const supportLinks = [
    {
        label: 'help',
        data: [
            { i18: 'delivery', url: '#' },
            { i18: 'credit', url: '#' },
            { i18: 'warranty', url: '#' },
            { i18: 'return', url: '#' },
            { i18: 'serviceCenter', url: '#' },
            { i18: 'trackOrder', url: '#' },
        ],
    },
    {
        label: 'info',
        data: [
            { i18: 'about', url: '#' },
            { i18: 'terms', url: '#' },
            { i18: 'jobs', url: '#' },
            { i18: 'contacts', url: '#' },
        ],
    },
    {
        label: 'services',
        data: [
            { i18: 'bonusAccount', url: '#' },
            { i18: 'premium', url: '#' },
            { i18: 'gifts', url: '#' },
            { i18: 'exchange', url: '#' },
            { i18: 'travel', url: '#' },
        ],
    },
    {
        label: 'partners',
        data: [
            { i18: 'franchising', url: '#' },
            { i18: 'sellOnRozetka', url: '#' },
            { i18: 'collaboration', url: '#' },
        ],
    },
]
const menuLinks = [
    {
        id: 0,
        url: '#',
        icon: 'laptop',
        i18: 'pc',
    },
    {
        id: 1,
        url: '#',
        icon: 'smartphone',
        i18: 'smartphone',
    },
    {
        id: 2,
        url: '#',
        icon: 'sports_esports',
        i18: 'gamers',
    },
    {
        id: 3,
        url: '#',
        icon: 'more_horiz',
        i18: 'etc',
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
</script>

<style scoped lang="stylus">
.sidebar-padding
    padding 16px 24px 16px 24px
.q-item
    padding 2px 24px 2px 0
    font-size 1em
    &:hover .q-item__section--main
        text-decoration underline
        color $app__text-hover
.apps img
    height 32px
.copyright
    font-size 0.9em
.q-card .q-card__section:nth-child(n+4)
    padding-top 0 !important
</style>
<i18n lang="yaml">
ru:
    mainMenu:
        pc: 'Ноутбуки и компьютеры'
        smartphone: 'Смартфоны, ТВ и Электроника'
        gamers: 'Товары для геймеров'
        etc: 'etc'
        help: 'Справочный центр'
    user:
        welcome: 'Добро пожаловать!'
        description: 'Войдите, чтобы получать рекомендации, персональные бонусы и скидки.'
        button: 'Войдите в личный кабинет'
        logout: 'Выход'
    apps: 'Устанавливайте наши приложения'
    socialLinks: 'Мы в социальных сетях'
    socialMenu:
        help: 'Помощь'
        delivery: 'Доставка и оплата'
        credit: 'Кредит'
        warranty: 'Гарантия'
        return: 'Возврат товара'
        serviceCenter: 'Сервисные центры'
        trackOrder: 'Отследить заказ'
        info: 'Информация о компании'
        about: 'О нас'
        terms: 'Условия использования сайта'
        jobs: 'Вакансии'
        contacts: 'Контакты'
        services: 'Сервисы'
        bonusAccount: 'Бонусный счет'
        premium: 'Rozetka Premium'
        gifts: 'Подарочные сертификаты'
        exchange: 'Rozetka Обмен'
        travel: 'Rozetka Travel'
        partners: 'Партнерам'
        franchising: 'Франчайзинг'
        sellOnRozetka: 'Продавать на Розетке'
        collaboration: 'Сотрудничество с нами'
    footer:
        license: 'ТМ используется на основании лицензии правообладателя RozetkaLTD.'
        copyright: '© Интернет-магазин «Розетка™»'
ua:
    mainMenu:
        pc: 'Ноутбуки та комп’ютери'
        smartphone: 'Смартфони, ТВ і електроніка'
        gamers: 'Товари для геймерів'
        etc: 'etc'
        help: 'Довідковий центр'
    user:
        welcome: 'Ласкаво просимо!'
        description: 'Увійдіть, щоб отримувати рекомендації, персональні бонуси і знижки.'
        button: 'Увійдіть в особистий кабінет'
        logout: 'Вихід'
    apps: 'Встановлюйте наші додатки'
    socialLinks: 'Ми в соціальних мережах'
    socialMenu:
        help: 'Допомога'
        delivery: 'Доставка та оплата'
        credit: 'Кредит'
        warranty: 'Гарантія'
        return: 'Повернення товару'
        serviceCenter: 'Сервісні центри'
        trackOrder: 'Відстежити замовлення'
        info: 'Інформація про компанію'
        about: 'Про нас'
        terms: 'Умови використання сайту'
        jobs: 'Вакансії'
        contacts: 'Контакти'
        services: 'Сервіси'
        bonusAccount: 'Бонусний рахунок'
        premium: 'Rozetka Premium'
        gifts: 'Подарункові сертифікати'
        exchange: 'Rozetka Обмін'
        travel: 'Rozetka Travel'
        partners: 'Партнерам'
        franchising: 'Франчайзинг'
        sellOnRozetka: 'Продавати на Розетці'
        collaboration: 'Співпраця з нами'
    footer:
        license: 'ТМ використовується на підставі ліцензії правовласника RozetkaLTD.'
        copyright: '© Інтернет-магазин «Розетка™»'
</i18n>
