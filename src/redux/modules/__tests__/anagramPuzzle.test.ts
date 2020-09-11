import { reducer, selectAnagramPuzzle, createQuestion, selectChar, deselectChar } from '../anagramPuzzle';
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
      answerData: {},
      questionData: {},
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
    expect(result.answerData).toEqual({
      '1': {
        id: '1',
        name: 'フシギダネ',
        order: 0
      },
      '20': {
        id: '20',
        name: 'クチート',
        order: 1
      },
      '300': {
        id: '300',
        name: 'ポリゴン',
        order: 2
      }
    });
    const hasAllId = Object.keys(result.answerData).every((answerId) => {
      return Object.keys(result.questionData).indexOf(answerId) >= 0
    })
    expect(hasAllId).toEqual(true);
  })
  it('selectChar: 文字を選択, deselectChar: 文字選択を解除', () => {
    // 問題を作成し
    const action = createQuestion(dummyData);
    const result = reducer(undefined, action);
    // 文字を選択すると
    const targetCharId = Object.keys(result.questionData['1'].chars)[0];
    const payload = {
      questionId: '1',
      charId: Object.keys(result.questionData['1'].chars)[0]
    };
    const selectCharAction = selectChar(payload);
    const selectCharResult = reducer(result, selectCharAction);
    // 選択状態になり
    expect(selectCharResult.questionData['1'].selectedChars)
      .toContain(targetCharId)
    // 文字の選択解除をすると
    const deselectCharAction = deselectChar(payload);
    const deselectCharResult = reducer(selectCharResult, deselectCharAction);
    // 選択が解除される
    expect(deselectCharResult.questionData['1'].selectedChars)
      .toEqual([])
  })
  it('selectChar: 文字を入れ替える', () => {
    // 問題を作成し
    const action = createQuestion(dummyData);
    const result = reducer(undefined, action);
    // 2文字選択すると
    const questionId = '1'
    const question = result.questionData[questionId].chars;
    const charIds = [Object.keys(question)[0], Object.keys(question)[1]]
    const payload = [{
      questionId,
      charId: charIds[0]
    }, {
      questionId,
      charId: charIds[1]
    }];
    const defaultChars = result.questionData[questionId].chars;

    const selectCharResult = reducer(result, selectChar(payload[0]));
    const nextSelectCharResult = reducer(selectCharResult, selectChar(payload[1]));
    const changedChars = nextSelectCharResult.questionData[questionId].chars;
    // 文字の順番が入れ替わる
    expect(changedChars[charIds[0]].order).toBe(defaultChars[charIds[1]].order);
    expect(changedChars[charIds[1]].order).toBe(defaultChars[charIds[0]].order);
  })
})
describe('anagramPuzzle selector', () => {
  it('StateからAnagramPazzle画面用のPropsを取得', () => {
    // createStoreし
    const store = configureStore();
    // selectAnagramPuzzleにstateが渡れば
    const result = selectAnagramPuzzle(store.getState());
    // データを返す
    expect(result).toEqual({
      questionData: [],
      isComplete: false,
      currentIndex: 0,
      currentStep: 1,
      maxStep: 0,
    });
  })
})