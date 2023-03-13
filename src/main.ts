import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(PrimeVue, {ripple: true});
app.use(ToastService);
app.directive('tooltip', Tooltip);
app.component('Dialog', Dialog)
app.mount('#app')