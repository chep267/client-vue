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

/** utils */
import { i18n } from '@module-language/utils/i18n';
import { vueComponents } from '@root/vuetify';
import { routers } from '@root/router';

/** components */
import App from '@root/components/App.vue';

const pinia = createPinia();
const app = createApp(App)
    .use(VueQueryPlugin)
    .use(pinia)
    .use(vueComponents)
    .use(i18n)
    .use(routers)
    .use(Particles, {
        init: async engine => {
            await loadSlim(engine);
        },
    });
app.mount('#app');
