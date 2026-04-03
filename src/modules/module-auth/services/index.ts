/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AuthApiPath } from '@module-auth/constants/AuthApiPath';

/** services */
import { BaseService } from '@module-base/services';

class AuthService extends BaseService {
    constructor(url = AuthApiPath.root) {
        super(url);
    }

    public signin = (data: App.ModuleAuth.Api.TypeApiAuth['Signin']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApiAuth['Signin']['Response'],
                App.ModuleAuth.Api.TypeApiAuth['Signin']['Payload']
            >(data, {
                url: AuthApiPath.signin,
            })
        );
    };

    public signout = (data: App.ModuleAuth.Api.TypeApiAuth['Signout']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApiAuth['Signout']['Response'],
                App.ModuleAuth.Api.TypeApiAuth['Signout']['Payload']
            >(data, {
                url: AuthApiPath.signout,
            })
        );
    };

    public restart = (data: App.ModuleAuth.Api.TypeApiAuth['Restart']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApiAuth['Restart']['Response'],
                App.ModuleAuth.Api.TypeApiAuth['Restart']['Payload']
            >(data, {
                url: AuthApiPath.restart,
            })
        );
    };

    public register = (data: App.ModuleAuth.Api.TypeApiAuth['Register']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApiAuth['Register']['Response'],
                App.ModuleAuth.Api.TypeApiAuth['Register']['Payload']
            >(data, {
                url: AuthApiPath.register,
            })
        );
    };

    public recover = (data: App.ModuleAuth.Api.TypeApiAuth['Recover']['Payload']) => {
        return this.withDelay(
            this.post<
                App.ModuleAuth.Api.TypeApiAuth['Recover']['Response'],
                App.ModuleAuth.Api.TypeApiAuth['Recover']['Payload']
            >(data, {
                url: AuthApiPath.recover,
            })
        );
    };
}

export const authService = new AuthService();
