/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { Regex } from '@module-auth/constants/Regex.ts';

export const authFormSchema = {
    email(value?: string) {
        if (!value || !value.trim()) {
            return 'module.auth.status.email.empty';
        }
        return !Regex.email.test(value) ? 'module.auth.status.email.invalid' : true;
    },
    password(value?: string) {
        if (!value || !value.trim()) {
            return 'module.auth.status.password.empty';
        }
        return !Regex.password.test(value) ? 'module.auth.status.password.invalid' : true;
    },
};
