import { createStore, applyMiddleware, combineReducers } from "redux";
import { reducer } from "store/reducers/content-consumer/common";
import { chats } from "store/reducers/content-consumer/chatbot";
import { notifications } from "store/reducers/content-creator/notifications";
import { editProfile } from "store/reducers/content-creator/editProfile";
import { session } from "store/reducers/common/session";
import { menus } from "store/reducers/content-consumer/menu";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  home: reducer,
  chats,
  notifications,
  editProfile,
  session,
  menus
});

export default createStore(rootReducer, applyMiddleware(thunk));
