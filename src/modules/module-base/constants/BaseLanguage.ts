/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const BaseLanguage = {
    component: {
        label: {
            default: 'module.base.component.label.default',
            start: 'module.base.component.label.start',
            develop: 'module.base.component.label.develop',
            error: {
                fallback: {
                    title: 'module.base.component.label.error.fallback.title',
                    content: 'module.base.component.label.error.fallback.content',
                    autoReload: 'module.base.component.label.error.fallback.autoReload',
                },
                server: 'module.base.component.label.error.server.busy',
            },
            language: {
                router: 'module.language.component.label.router',
                vi: 'module.language.component.label.vi',
                en: 'module.language.component.label.en',
            },
            theme: {
                router: 'module.theme.component.label.router',
                dark: 'module.theme.component.label.dark',
                light: 'module.theme.component.label.light',
            },
        },
        button: {
            retry: 'module.game.component.button.retry',
        },
        table: {
            empty: 'module.base.component.table.empty',
        },
    },
} as const;
