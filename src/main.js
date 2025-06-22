import { createApp } from "vue";
import axios from "axios"; // Https request
import "bootstrap-icons/font/bootstrap-icons.css"; // 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.vue";
import router from "./router";

// ---
// استيراد Element-Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"; // استيراد ملف CSS الخاص بـ Element-Plus
// ---
// استيراد Pinia
import { createPinia } from "pinia";

// ---

const app = createApp(App);

app.use(router);

// استخدام Element-Plus
app.use(ElementPlus);

// استخدام Pinia
const pinia = createPinia();
app.use(pinia);

app.mount("#app");
