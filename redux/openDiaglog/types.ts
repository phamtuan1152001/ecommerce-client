import { CLOSE_DIALOG, OPEN_DIALOG } from "./constants";

export interface DialogState {
  isOpen: boolean
} 

export interface OpenDialog {
  type: typeof OPEN_DIALOG,
}

export interface CloseDialog {
  type: typeof CLOSE_DIALOG,
}

export type DialogActions = OpenDialog | CloseDialog