/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypeCallApiPayload, TypeResponseApi } from '@module-base/types';
import type { TypeUser } from '@module-user/types';

export declare interface TypeApiAuth {
    Signin: {
        Payload: TypeCallApiPayload<{ email: NonNullable<TypeUser['email']>; password: string }>;
        Response: TypeResponseApi<{ user: TypeUser; token: { exp: number } }>;
    };
    SignOut: {
        Payload: TypeCallApiPayload;
        Response: void;
    };
    Restart: {
        Payload: TypeCallApiPayload;
        Response: TypeResponseApi<{ user: TypeUser; token: { exp: number } }>;
    };
    Register: {
        Payload: TypeCallApiPayload<{ email: NonNullable<TypeUser['email']>; password: string }>;
        Response: TypeResponseApi;
    };
    Recover: {
        Payload: TypeCallApiPayload<{ email: NonNullable<TypeUser['email']> }>;
        Response: TypeResponseApi;
    };
}
