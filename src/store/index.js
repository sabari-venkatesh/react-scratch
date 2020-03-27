import { createStore } from "redux";
import rootReducer from "store/reducers";

const makeStore = () => {
  const store = createStore(rootReducer);

  if (module.hot) {
    module.hot.accept("./reducers/index", () => {
      // const nextRootReducer = require("./reducers/index");
      store.replaceReducer(rootReducer);
      console.log(store.getState());
    });
  }

  return store;
};

export default makeStore;
