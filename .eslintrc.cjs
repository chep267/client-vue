/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */


module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "prettier",
    ],
    parser: "vue-eslint-parser",
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    rules: {
        'vue/multi-word-component-names': 'off',
        // Cảnh báo khi import sai
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@mui/*/*/*'],
                paths: ['lodash'],
            },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
