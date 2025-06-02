/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export interface TypeApiAuth {
    Signin: {
        Payload: App.ModuleBase.Apis.Payload<{ email: NonNullable<App.ModuleUser.Data.User['email']>; password: string }>;
        Response: App.ModuleBase.Apis.Response<{ user: App.ModuleUser.Data.User; token: { exp: number } }>;
    };
    SignOut: {
        Payload: App.ModuleBase.Apis.Payload;
        Response: void;
    };
    Restart: {
        Payload: App.ModuleBase.Apis.Payload;
        Response: App.ModuleBase.Apis.Response<{ user: App.ModuleUser.Data.User; token: { exp: number } }>;
    };
    Register: {
        Payload: App.ModuleBase.Apis.Payload<{ email: NonNullable<App.ModuleUser.Data.User['email']>; password: string }>;
        Response: App.ModuleBase.Apis.Response;
    };
    Recover: {
        Payload: App.ModuleBase.Apis.Payload<{ email: NonNullable<App.ModuleUser.Data.User['email']> }>;
        Response: App.ModuleBase.Apis.Response;
    };
}
