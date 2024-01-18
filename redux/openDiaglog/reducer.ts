import { CLOSE_DIALOG, OPEN_DIALOG } from "./constants";

import { DialogActions, DialogState } from "./types";

const initialState: DialogState = {
  isOpen: false,
}

export default (state = initialState, action: DialogActions) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        isOpen: true
      }
    case CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false
      }
    default:
      return state
  }
}