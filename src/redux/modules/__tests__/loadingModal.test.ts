import { reducer, open, close, selectLoadingModal } from '../loadingModal';
import { configureStore } from './configureMockStore';

const initialState = {
  shouldShow: false,
};

describe('loadingModal', () => {
  describe('reducer', () => {
    describe('初期State', () => {
      it('初期Stateを構築できる', () => {
        const result = reducer(undefined, { type: 'hoge' });
        expect(result).toEqual(initialState)
      })
    })
    describe('open: 表示する', () => {
      it('フラグがtrueになる', () => {
        const action = open();
        const result = reducer(undefined, action);
        expect(result.shouldShow).toBe(true);
      })
    })
    describe('close: 表示する', () => {
      it('フラグがfalseになる', () => {
        const action = close();
        const result = reducer(undefined, action);
        expect(result.shouldShow).toBe(false);
      })
    })
  })
  describe('selector', () => {
    describe('Props', () => {
      it('Stateから画面用のPropsを取得できる', () => {
        const store = configureStore();
        const result = selectLoadingModal(store.getState());
        expect(result).toEqual({
          shouldShow: false,
        });
      })
    })
  })
})