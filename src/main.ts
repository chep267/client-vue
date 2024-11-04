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
import { vueComponents } from '@root/utils/vueComponents';
import { routers } from '@root/utils/routers';

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
            // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
            await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if you don't need Shapes or Animations
        },
    });
app.mount('#app');
