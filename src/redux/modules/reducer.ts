import { combineReducers } from "redux";
import hoge from "./hoge";

const rootReducer = combineReducers({
  // resources: combineReducers({}),
  ui: combineReducers({
    hoge,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
