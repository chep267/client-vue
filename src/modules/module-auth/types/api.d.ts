/**
 *
 * @author dongntd267@gmail.com
 *
 */

export interface TypeApiAuth {
    Signin: {
        Payload: App.ModuleBase.Api.Payload<{ email: NonNullable<App.ModuleUser.Data.User['email']>; password: string }>;
        Response: App.ModuleBase.Api.Response<{ user: App.ModuleUser.Data.User; token: { exp: number } }>;
    };
    SignOut: {
        Payload: App.ModuleBase.Api.Payload;
        Response: void;
    };
    Restart: {
        Payload: App.ModuleBase.Api.Payload;
        Response: App.ModuleBase.Api.Response<{ user: App.ModuleUser.Data.User; token: { exp: number } }>;
    };
    Register: {
        Payload: App.ModuleBase.Api.Payload<{ email: NonNullable<App.ModuleUser.Data.User['email']>; password: string }>;
        Response: App.ModuleBase.Api.Response;
    };
    Recover: {
        Payload: App.ModuleBase.Api.Payload<{ email: NonNullable<App.ModuleUser.Data.User['email']> }>;
        Response: App.ModuleBase.Api.Response;
    };
}
