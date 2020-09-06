import { createStore, Store } from 'redux';
import rootReducer, { RootState } from '../reducer';

export const configureStore = (): Store<RootState> => {
  return createStore(rootReducer)
}