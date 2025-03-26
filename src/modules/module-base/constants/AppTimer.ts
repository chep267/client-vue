/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export const AppTimer = {
    timeoutApi: 0,
    pendingApi: 600,
    searching: 1000,
    notifyDuration: 2000,
    countdownError: 99,
    restart: 15 * 60 * 1000,
    debounce: 1000,
    delay: 1000,
} as const;
