/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypeCallApiPayload, TypeResponseApi } from '@module-base/types';
import type { TypeUser } from '@module-user/types';

export interface TypeApiAuth {
    Signin: {
        Payload: TypeCallApiPayload<{ email: TypeUser['email']; password: string }>;
        Response: TypeResponseApi<{ user: TypeUser; token: { exp: number } }>;
    };
    Signout: {
        Payload: TypeCallApiPayload;
        Response: void;
    };
    Restart: {
        Payload: TypeCallApiPayload;
        Response: TypeResponseApi<{ user: TypeUser; token: { exp: number } }>;
    };
    Register: {
        Payload: TypeCallApiPayload<{ email: TypeUser['email']; password: string }>;
        Response: TypeResponseApi;
    };
    Recover: {
        Payload: TypeCallApiPayload<{ email: TypeUser['email'] }>;
        Response: TypeResponseApi;
    };
}
