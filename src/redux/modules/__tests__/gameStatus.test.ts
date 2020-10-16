import { reducer, start, stop, selectGameStatus } from '../gameStatus';
import { configureStore } from './configureMockStore';

const initialState = {
  isPlaying: false,
};

describe('loadingModal', () => {
  describe('reducer', () => {
    describe('初期State', () => {
      it('初期Stateを構築できる', () => {
        const result = reducer(undefined, { type: 'hoge' });
        expect(result).toEqual(initialState)
      })
    })
    describe('start: ゲームをスタートする', () => {
      it('フラグがtrueになる', () => {
        const action = start();
        const result = reducer(undefined, action);
        expect(result.isPlaying).toBe(true);
      })
    })
    describe('stop: ゲームを終える', () => {
      it('フラグがfalseになる', () => {
        const action = stop();
        const result = reducer(undefined, action);
        expect(result.isPlaying).toBe(false);
      })
    })
  })
  describe('selector', () => {
    describe('Props', () => {
      it('Stateから画面用のPropsを取得できる', () => {
        const store = configureStore();
        const result = selectGameStatus(store.getState());
        expect(result).toEqual({
          isPlaying: false,
        });
      })
    })
  })
})