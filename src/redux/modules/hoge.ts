import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { RootState } from "./reducer";
import actionCreatorFactory from "typescript-fsa";

// actions
const actionCreator = actionCreatorFactory();

export const updateName = actionCreator<string>("ACTIONS_UPDATE_NAME");
export const updateEmail = actionCreator<string>("ACTIONS_UPDATE_EMAIL");

// state
const initialState = {
  name: "",
  email: "",
};

// reducer
const reducer = reducerWithInitialState(initialState)
  .case(updateName, (state, name) => {
    return Object.assign({}, state, { name });
  })
  .case(updateEmail, (state, email) => {
    return Object.assign({}, state, { email });
  });

export default reducer;

// selector
export const selectHoge = createSelector(
  (state: RootState) => state.ui.hoge,
  (hoge) => hoge
);

export type SelectedHoge = ReturnType<typeof selectHoge>;
