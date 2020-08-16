import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { hogeActions } from "../../actions/hogeActions";
import { RootState } from "./reducer";

export interface HogeState {
  name: string;
  email: string;
}

const initialState: HogeState = {
  name: "",
  email: "",
};

export const reducer = reducerWithInitialState(initialState)
  .case(hogeActions.updateName, (state, name) => {
    return Object.assign({}, state, { name });
  })
  .case(hogeActions.updateEmail, (state, email) => {
    return Object.assign({}, state, { email });
  });

export default reducer;

export const selectHoge = createSelector(
  (state: RootState) => state.ui.hoge,
  (hoge) => hoge
);

export type SelectedHoge = ReturnType<typeof selectHoge>;
