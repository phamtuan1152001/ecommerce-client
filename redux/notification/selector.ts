import { AppState } from "../rootReducers"

export const getListNotificationSelector = (state: AppState) => state.notification.notification
export const getSuccessNotificationSelector = (state: AppState) => state.notification.success
export const getFailNotificationSelector = (state: AppState) => state.notification.fail
export const getLoadingNotificationSelector = (state: AppState) => state.notification.loading