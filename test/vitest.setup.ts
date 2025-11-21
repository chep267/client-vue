/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { beforeEach } from 'vitest';
import { config } from '@vue/test-utils';
import '@testing-library/jest-dom/vitest';

/** utils */
import { i18n } from '@module-base/utils/i18n';
import { vueComponents } from '@root/vuetify';

const app = document.createElement('div');
app.setAttribute('data-app', 'true');
document.body.appendChild(app);

beforeEach(() => {
    config.global.plugins = [vueComponents, i18n];
});
