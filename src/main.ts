/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Particles from '@tsparticles/vue3';
import { loadSlim } from '@tsparticles/slim';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { setupCalendar, DatePicker } from '@angelblanco/v-calendar';
import '@angelblanco/v-calendar/style.css';

/** utils */
import { i18n } from '@module-language/utils/i18n';
import { vueComponents } from '@root/vuetify';
import { routers } from '@root/router';

/** components */
import App from '@root/components/App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(routers);
app.use(VueQueryPlugin);
app.use(vueComponents);
app.use(i18n);
app.use(Particles, {
    init: async (engine) => {
        await loadSlim(engine);
    },
});
app.use(setupCalendar, { componentPrefix: 'vc-' });
app.component('VcDatePicker', DatePicker);
app.mount('#app');
