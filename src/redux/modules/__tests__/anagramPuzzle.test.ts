import { reducer, setBaseData, State, selectAnagramPuzzle, createQuestion } from '../anagramPuzzle';
import { configureStore } from './configureMockStore';

const dummyData = [{
  id: '1',
  name: 'フシギダネ'
}, {
  id: '20',
  name: 'クチート'
}, {
  id: '300',
  name: 'ポリゴン'
}];

describe('anagramPuzzle reducer', () => {
  it('初期State', () => {
    const result = reducer(undefined, { type: 'hoge' });
    expect(result).toEqual({
      answerData: [],
      questionData: [],
      isComplete: false,
      currentIndex: 0,
    })
  })
  it('createQuestion: 問題を作成', () => {
    // データの乗ったActionが発行され
    const action = createQuestion(dummyData);
    // reducerに渡ったら
    const result = reducer(undefined, action);
    // 答えと問題がセットされる
    expect(result.answerData).toEqual(dummyData);
    expect(result.questionData.length).toEqual(result.answerData.length);
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
      answerData: [],
      questionData: [],
      isComplete: false,
      currentIndex: 0,
      currentStep: 1,
      maxStep: 0,
    });
  })
})