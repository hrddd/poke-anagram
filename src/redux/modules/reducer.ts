import { combineReducers } from "redux";
import { reducer as anagramPuzzle } from './anagramPuzzle';
import { reducer as loadingModal } from './loadingModal';
import { pokeData } from './pokeData';

const rootReducer = combineReducers({
  resources: combineReducers({
    pokeData
  }),
  ui: combineReducers({
    anagramPuzzle,
    loadingModal
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
