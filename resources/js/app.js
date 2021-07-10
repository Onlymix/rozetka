import { createApp } from 'vue'
import { Quasar, LoadingBar } from 'quasar'
import root from './layouts/root.vue'

const app = createApp(root)
app.use(Quasar, { plugins: { LoadingBar } }).mount('#app')
