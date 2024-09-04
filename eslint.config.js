/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import js from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import ts from 'typescript-eslint';

export default ts.config(js.configs.recommended, ...ts.configs.recommended, ...eslintPluginVue.configs['flat/recommended'], {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,vue}'],
    languageOptions: {
        parserOptions: {
            parser: '@typescript-eslint/parser',
        },
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
                selfClosingTag: {
                    singleline: 'never',
                    multiline: 'always',
                },
            },
        ],
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index'],
            },
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
    },
});
