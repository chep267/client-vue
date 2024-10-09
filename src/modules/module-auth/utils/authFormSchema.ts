/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { Regex } from '@module-auth/constants/Regex';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

export const authFormSchema = {
    email(value?: string) {
        if (!value?.trim()) {
            return AuthLanguage.status.email.empty;
        }
        return !Regex.email.test(value) ? AuthLanguage.status.email.invalid : true;
    },
    password(value?: string) {
        if (!value?.trim()) {
            return AuthLanguage.status.password.empty;
        }
        return !Regex.password.test(value) ? AuthLanguage.status.password.invalid : true;
    },
};
