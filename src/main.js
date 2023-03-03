import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from "pinia";

import { useProductStore } from "./stores/productStore.js";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import 'vue-universal-modal/dist/index.css';
import VueUniversalModal from 'vue-universal-modal';

library.add(fas);

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.component('font-awesome-icon',FontAwesomeIcon);
app.use(VueUniversalModal,{
    teleportTarget: '#modals',
});
//.config.devtools = false;
app.mount('#app');

const store = useProductStore();
store.getProductosBaseDatos();


