/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
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
        },
        button: {
            retry: 'module.game.component.button.retry',
        },
        table: {
            empty: 'module.base.component.table.empty',
        },
    },
} as const;
