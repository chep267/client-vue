/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

export const ApiStatus = {
    pending: 'api_status_pending',
    success: 'api_status_success',
    error: 'api_status_error',
} as const;

export const ApiMethod = {
    get: 'get',
    post: 'post',
    push: 'push',
    delete: 'delete',
} as const;
