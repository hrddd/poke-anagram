import { combineReducers } from "redux";
import { anagramPazzle } from './anagramPazzle';
import { hoge } from './hoge';
import { pokeData } from './pokeData';

const rootReducer = combineReducers({
  resources: combineReducers({
    pokeData
  }),
  ui: combineReducers({
    hoge,
    anagramPazzle
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
