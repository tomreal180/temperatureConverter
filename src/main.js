import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import Converter from './components/Converter.vue'
import App from './App.vue'

const app= createApp(App)
app.component('converter', Converter)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
