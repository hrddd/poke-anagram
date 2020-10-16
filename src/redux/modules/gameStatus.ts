import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { RootState } from "./reducer";
import actionCreatorFactory from "typescript-fsa";

// actions
const actionCreator = actionCreatorFactory('gameStatus');
// TODO: 名前が一般的すぎてimportのバッティングが懸念。問題あったら即直し
export const start = actionCreator("START");
export const stop = actionCreator("STOP");

// state
const initialState = {
  isPlaying: false,
};

// reducer
export const reducer = reducerWithInitialState(initialState)
  .case(start, (state) => ({
    ...state,
    isPlaying: true,
  }))
  .case(stop, (state) => ({
    ...state,
    isPlaying: false,
  }));

// selector
export const selectGameStatus = createSelector(
  (state: RootState) => state.ui.gameStatus,
  (gameStatus) => ({
    ...gameStatus,
  })
);

export type SelectedGameStatus = ReturnType<typeof selectGameStatus>;
