import { APP_ACTION_TYPES } from "store/constants";

const initialState = {
  title: "hello world redux  dsd"
};

function setTitle(state, data) {
  return { ...state, title: data };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case APP_ACTION_TYPES.setTitle:
      return setTitle(state, action.data);
    default:
      return state;
  }
}
