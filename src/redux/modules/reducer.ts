import { combineReducers } from "redux";
import { reducer as anagramPuzzle } from './anagramPuzzle';
import { hoge } from './hoge';
import { pokeData } from './pokeData';

const rootReducer = combineReducers({
  resources: combineReducers({
    pokeData
  }),
  ui: combineReducers({
    hoge,
    anagramPuzzle
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
