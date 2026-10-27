import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import { createPinia } from 'pinia';
import quasarLang from 'quasar/lang/ru';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';
import { setupGlobalErrorHandler } from './utils/errorHandling';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: { Notify },
  lang: quasarLang
});

// Подключаем глобальный обработчик необработанных ошибок
setupGlobalErrorHandler(app);

app.mount('#q-app');
