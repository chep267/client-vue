/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

export const AuthLanguage = {
    component: {
        button: {
            signin: 'module.auth.component.button.signin.text',
            register: 'module.auth.component.button.register.text',
            recover: 'module.auth.component.button.recover.text',
            clear: 'module.auth.component.button.clear.text',
        },
        label: {
            email: 'module.auth.component.label.email',
            password: 'module.auth.component.label.password',
            confirmPassword: 'module.auth.component.label.confirmPassword',
        },
        title: {
            signin: 'module.auth.component.title.signin',
            register: 'module.auth.component.title.register',
            recover: 'module.auth.component.title.recover',
            verifyOTP: 'module.auth.component.title.verifyOTP',
            signout: 'module.auth.component.title.signout',
        },
    },
    status: {
        email: {
            empty: 'module.auth.status.email.empty',
            invalid: 'module.auth.status.email.invalid',
        },
        password: {
            empty: 'module.auth.status.password.empty',
            invalid: 'module.auth.status.password.invalid',
        },
    },
    notify: {
        server: {
            error: 'module.auth.notify.server.error',
        },
        refresh: {
            error: 'module.auth.notify.refresh.error',
        },
        signin: {
            error: 'module.auth.notify.signin.error',
        },
        register: {
            success: 'module.auth.notify.register.success',
            error: 'module.auth.notify.register.error',
        },
        recover: {
            success: 'module.auth.notify.recover.success',
            error: 'module.auth.notify.recover.error',
        },
    },
} as const;
