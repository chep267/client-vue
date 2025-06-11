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
import { setupCalendar } from '@angelblanco/v-calendar';

/** utils */
import { i18n } from '@module-language/utils/i18n';
import { vueComponents } from '@root/vuetify';
import { routers } from '@root/router';

/** components */
import App from '@root/components/App.vue';

const pinia = createPinia();
const app = createApp(App);

window.checkMobile = () => /iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent);
window.isMobile = window.checkMobile();

app.use(pinia);
app.use(routers);
app.use(VueQueryPlugin);
app.use(vueComponents);
app.use(i18n);
app.use(Particles, {
    init: async (engine: any) => {
        await loadSlim(engine);
    },
});
app.use(setupCalendar, {});
app.mount('#app');
