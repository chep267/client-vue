/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';

export default tsEslint.config({
    ignores: ['dist/*', 'node_modules/*'],
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,vue}'],
    extends: [eslint.configs.recommended, ...tsEslint.configs.recommended, ...eslintPluginVue.configs['flat/recommended']],
    plugins: {
        prettier: pluginPrettier,
    },
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
