/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** libs */
import colors from 'vuetify/util/colors';

/** @type {import('tailwindcss').Config} */

export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                // arial: 'Arial, sans-serif',
            },
            transitionProperty: {
                spacing: 'margin, padding',
            },
            colors: {
                // error: '#cd0000',
                // main: '#f36c21',
                'auth-title': {
                    light: colors.blue.base,
                    dark: colors.shades.white,
                },
            },
            lineHeight: {
                // custom: '1.1',
            },
            fontSize: {
                // 15: ['15px', 1.5],
                // 22: ['22px', 1.5],
            },
            maxWidth: {
                // 'auth-form': '715px',
            },
            padding: {
                // screen: '244px',
            },
        },
    },
    plugins: [],
};
