/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const AppTimer = {
    timeoutApi: 0,
    pendingApi: 600, //600 milliseconds
    searching: 1000, // 1 second
    notifyDuration: 2000, // 2 seconds
    countdownError: 99, // 99 seconds
    restart: 15 * 60 * 1000, // 15 minutes
    debounce: 1000, // 1 second
    delay: 1000, // 1 second
} as const;
