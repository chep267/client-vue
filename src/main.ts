/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Particles from '@tsparticles/vue3';
import { loadSlim } from '@tsparticles/slim';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { setupCalendar } from 'v-calendar';

/** utils */
import { i18n } from '@src/plugins/i18n';
import { vuetify } from '@src/plugins/vuetify';
import { router } from '@src/plugins/router';

/** components */
import App from '@src/App.vue';

/** styles */
import '@src/styles/main.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);
app.use(vuetify);
app.use(i18n);
app.use(Particles, {
    init: async (engine: any) => {
        await loadSlim(engine);
    },
});
app.use(setupCalendar, {});
app.mount('#root');
