// main.js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import router from './router'

import { createI18n } from 'vue-i18n' // Usa `createI18n` en lugar de `VueI18n`
import { languages, defaultLocale } from './i18n/index.js'

const i18n = createI18n({
	locale: defaultLocale,
	fallbackLocale: 'en',
	messages: languages
})

import  VueSelect from "vue-select";

createApp(App)
	.use(router)
	.use(i18n)
	.component("v-select", VueSelect)
	.mount('#app')
