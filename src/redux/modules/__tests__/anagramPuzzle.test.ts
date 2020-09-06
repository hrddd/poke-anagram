import { reducer, setBaseData, State, selectAnagramPuzzle } from '../anagramPuzzle';
import { configureStore } from './configureMockStore';

describe('anagramPuzzle reducer', () => {
  it('初期State', () => {
    const result = reducer(undefined, { type: 'hoge' });
    expect(result).toEqual({
      baseData: [],
      questionData: [],
      isComplete: false,
      currentIndex: 0,
    })
  })
  it('setBaseData: 問題のベースデータの設定', () => {
    // データの乗ったActionが発行され
    const action = setBaseData([{
      id: '1',
      name: 'aaa'
    }]);
    // reducerに渡ったら
    const result = reducer(undefined, action);
    // 問題のベースデータがセットされる
    expect(result).toEqual({
      baseData: [{
        id: '1',
        name: 'aaa'
      }],
      questionData: [],
      isComplete: false,
      currentIndex: 0,
    })
    // it('createQuestion: 問題を作成', () => {
    //   // 個数の乗ったActionが発行され
    //   const action = createQuestion(5);
    //   // reducerに渡ったら
    //   const result = reducer(undefined, action);
    //   // 問題の個数が決まる
    //   expect(result.baseData.length).toBe(5);
    // })
  })
})
describe('anagramPuzzle selector', () => {
  it('StateからAnagramPazzle画面用のPropsを取得', () => {
    // createStoreし
    const store = configureStore();
    // selectAnagramPuzzleにstateが渡れば
    const result: State = selectAnagramPuzzle(store.getState());
    // データを返す
    expect(result).toEqual({
      baseData: [],
      questionData: [],
      isComplete: false,
      currentIndex: 0,
      currentStep: 1,
      maxStep: 0,
    });
  })
})