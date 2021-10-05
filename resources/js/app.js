import { createApp } from 'vue'
import { Quasar, LoadingBar } from 'quasar'
import root from './layouts/Root.vue'
import { user } from './global'

const app = createApp(root)
app.use(Quasar, { plugins: { LoadingBar } }).provide('user', user).mount('#app')
