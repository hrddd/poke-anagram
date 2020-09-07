import { reducer, State, selectAnagramPuzzle, createQuestion, selectChar, deselectChar } from '../anagramPuzzle';
import { configureStore } from './configureMockStore';

const dummyAnswerData = [{
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
    const action = createQuestion(dummyAnswerData);
    // reducerに渡ったら
    const result = reducer(undefined, action);
    // 答えと問題がセットされる
    expect(result.answerData).toEqual(dummyAnswerData);
    expect(result.questionData.length).toEqual(result.answerData.length);
  })
  it('selectChar: 文字を選択, deselectChar: 文字選択を解除', () => {
    // 問題を作成し
    const action = createQuestion(dummyAnswerData);
    const result = reducer(undefined, action);
    // 文字を選択すると
    const targetId = Object.keys(result.questionData[0].name)[0];
    const selectCharAction = selectChar(targetId);
    const selectCharResult = reducer(result, selectCharAction);
    // 選択状態になり
    const selectedChar = selectCharResult.questionData[0].name[targetId];
    expect(selectedChar.isSelected).toBe(true);
    // 文字の選択解除をすると
    const deselectCharAction = deselectChar(targetId);
    const deselectCharResult = reducer(selectCharResult, deselectCharAction);
    const deselectedChar = deselectCharResult.questionData[0].name[targetId];
    // 選択が解除される
    expect(deselectedChar.isSelected).toBe(false);
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