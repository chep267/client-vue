/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

export const en = {
    // title
    [AuthLanguage.component.title.signin]: 'Sign in',
    [AuthLanguage.component.title.register]: 'Register',
    [AuthLanguage.component.title.recover]: 'Recover',
    [AuthLanguage.component.title.verifyOTP]: 'Verify code',
    [AuthLanguage.component.title.signout]: 'Sign out',

    // label
    [AuthLanguage.component.label.email]: 'Email',
    [AuthLanguage.component.label.password]: 'Password',
    [AuthLanguage.component.label.confirmPassword]: 'Re-enter the password',

    // status
    [AuthLanguage.status.email.empty]: 'Email is empty!',
    [AuthLanguage.status.password.empty]: 'Password is empty!',
    [AuthLanguage.status.email.invalid]: 'Email is invalid!',
    [AuthLanguage.status.password.invalid]:
        '8 characters minimum, 1 lower case, 1 upper case, 1 number, 1 special character!',

    // button
    [AuthLanguage.component.button.signin]: 'Sign in',
    [AuthLanguage.component.button.register]: 'Register',
    [AuthLanguage.component.button.recover]: 'Confirm',
    [AuthLanguage.component.button.clear]: 'Refresh',

    // notify
    [AuthLanguage.notify.refresh.error]: 'This session has expired!',
    [AuthLanguage.notify.signin.error]: 'Account or password is incorrect!',
    [AuthLanguage.notify.register.success]: 'Account registered successfully!',
    [AuthLanguage.notify.register.error]: 'Account already exists!',
    [AuthLanguage.notify.recover.success]: 'Account recovered successfully!',
    [AuthLanguage.notify.recover.error]: "Account doesn't exists!",
    [AuthLanguage.notify.server.error]: 'The server is not responding, please try again later.',
} as const;
