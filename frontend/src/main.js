import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
// createApp(App).mount('#app')
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.mount('#app')