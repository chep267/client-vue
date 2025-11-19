/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AuthApiPath } from '@module-auth/constants/AuthApiPath';

/** services */
import { BaseServices } from '@module-base/services';

class AuthServices extends BaseServices {
    constructor(url = AuthApiPath.root) {
        super(url);
    }

    public signin = (data: App.ModuleAuth.Api.Signin['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Signin['Response'], App.ModuleAuth.Api.Signin['Payload']>(data, {
                url: AuthApiPath.signin,
            })
        );
    };

    public signout = (data: App.ModuleAuth.Api.Signout['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Signout['Response'], App.ModuleAuth.Api.Signout['Payload']>(data, {
                url: AuthApiPath.signout,
            })
        );
    };

    public restart = (data: App.ModuleAuth.Api.Restart['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Restart['Response'], App.ModuleAuth.Api.Restart['Payload']>(data, {
                url: AuthApiPath.restart,
            })
        );
    };

    public register = (data: App.ModuleAuth.Api.Register['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Register['Response'], App.ModuleAuth.Api.Register['Payload']>(data, {
                url: AuthApiPath.register,
            })
        );
    };

    public recover = (data: App.ModuleAuth.Api.Recover['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleAuth.Api.Recover['Response'], App.ModuleAuth.Api.Recover['Payload']>(data, {
                url: AuthApiPath.recover,
            })
        );
    };
}

export const authServices = new AuthServices();
