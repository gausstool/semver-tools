import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import UIComponents from '@gausszhou/ui-vue-components'
import "@gausszhou/ui-vue-theme-chalk"

createApp(App).use(UIComponents).mount('#app')
