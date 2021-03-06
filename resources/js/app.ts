import { UserKey } from './ts/symbols'
import { createApp } from 'vue'
import { Quasar, LoadingBar } from 'quasar'
import root from './layouts/Root.vue'
import { createI18n } from 'vue-i18n'
import { user } from './global'

const savedLanguage = localStorage.getItem('lang')
let lang

// set language to default if not cached
const defaultLang = 'ru'
if (savedLanguage === null) {
    localStorage.setItem('lang', defaultLang)
    lang = defaultLang
} else lang = savedLanguage

const i18n = createI18n({
    locale: lang,
    legacy: false,
    messages: {
        ru: {},
        ua: {},
    },
})

const app = createApp(root)
app.use(Quasar, { plugins: { LoadingBar } }).use(i18n).provide(UserKey, user).mount('#app')
