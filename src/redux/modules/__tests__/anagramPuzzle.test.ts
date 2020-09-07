import { reducer, State, selectAnagramPuzzle, createQuestion, selectChar, QuestionData } from '../anagramPuzzle';
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
  it('selectChar: 文字を選択', () => {
    // 問題を作成し
    const action = createQuestion(dummyData);
    const result = reducer(undefined, action);
    // 文字を選択すると
    const targetId = result.questionData[0].name[0].id;
    const selectCharAction = selectChar(targetId);
    const selectCharResult = reducer(result, selectCharAction);
    // 問題の文字が選択状態に
    const selectedChar = selectCharResult.questionData.filter((question) => {
      return question.name.filter((char) => {
        return char.isSelected;
      });
    })[0].name[0];
    expect(selectedChar?.id).toBe(targetId);
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