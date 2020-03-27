import { APP_ACTION_TYPES } from "store/constants";

export function setTitle(title) {
  return {
    type: APP_ACTION_TYPES.setTitle,
    data: title
  };
}
