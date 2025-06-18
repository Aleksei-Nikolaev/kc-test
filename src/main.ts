import { createApp } from 'vue'
import App from '@/app/App.vue'
import PrimeVue from 'primevue/config'
import {themePreset} from "@/shared/config/themePreset"
import '@/app/styles/main.scss'
import vAutofocus from '@/shared/lib/directives/autofocus'


const app = createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: themePreset,
            options: {
                darkModeSelector: false
            }
        }
    })
    .directive('autofocus', vAutofocus)

app.mount('#app')
