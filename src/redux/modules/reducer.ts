import { combineReducers } from "redux";
import { reducer as anagramPuzzle } from './anagramPuzzle';
import { pokeData } from './pokeData';

const rootReducer = combineReducers({
  resources: combineReducers({
    pokeData
  }),
  ui: combineReducers({
    anagramPuzzle
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
