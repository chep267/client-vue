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
import { i18n } from '@src/plugins/i18n';
import { vuetify } from '@src/plugins/vuetify';

const app = document.createElement('div');
app.setAttribute('data-app', 'true');
document.body.appendChild(app);

beforeEach(() => {
    config.global.plugins = [vuetify, i18n];
});
