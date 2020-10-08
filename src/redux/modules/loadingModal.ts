import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { RootState } from "./reducer";
import actionCreatorFactory from "typescript-fsa";

// actions
const actionCreator = actionCreatorFactory('loadingModal');

export const open = actionCreator("OPEN");
export const close = actionCreator("CLOSE");

// state
const initialState = {
  shouldShow: false,
};

// reducer
export const reducer = reducerWithInitialState(initialState)
  .case(open, (state) => ({
    ...state,
    shouldShow: true,
  }))
  .case(close, (state) => ({
    ...state,
    shouldShow: false,
  }));

// selector
export const selectLoadingModal = createSelector(
  (state: RootState) => state.ui.loadingModal,
  (loadingModal) => ({
    ...loadingModal,
  })
);

export type SelectedLoadingModal = ReturnType<typeof selectLoadingModal>;
