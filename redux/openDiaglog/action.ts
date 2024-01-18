import { OPEN_DIALOG, CLOSE_DIALOG } from "./constants";

export const openDiaglog = () => ({
  type: OPEN_DIALOG,
})

export const closeDialog = () => ({
  type: CLOSE_DIALOG
})