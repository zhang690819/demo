import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import pinia from './store';

import 'element-plus/dist/index.css'
import '@/assets/css/reset.css'
import '@/assets/css/public.css'


createApp(App).use(ElementPlus).use(router).use(pinia).mount('#app')
