import { createApp } from 'vue'
import Converter from './components/Converter.vue'
import App from './App.vue'
import Result from './components/Result.vue'

const app= createApp(App)
app.component('converter', Converter)
app.component('result', Result)
app.mount('#app')