import { reducer, createQuestion, selectChar, deselectChar, swapChars, checkAnswers, selectAnagramPuzzle } from '../anagramPuzzle';
import { configureStore } from './configureMockStore';

const initialState = {
  answers: {},
  questions: [],
  selectedChar: null,
  correctQuestions: [],
};

describe('anagramPuzzle reducer', () => {
  it('初期State', () => {
    const result = reducer(undefined, { type: 'hoge' });
    expect(result).toEqual(initialState)
  })
  it('createQuestion: 問題を作成', () => {
    // ベースとなるデータを渡すと
    const baseData = [{
      id: '1',
      name: 'フシギダネ'
    }, {
      id: '20',
      name: 'クチート'
    }];
    const action = createQuestion(baseData);
    const result = reducer(undefined, action);
    // 答えと問題がセットされる
    expect(result.answers).toEqual({
      '1': {
        id: '1',
        name: 'フシギダネ'
      },
      '20': {
        id: '20',
        name: 'クチート'
      }
    });
    expect(result.questions).toHaveLength(2);
  })
  it('selectChar: 文字を選択', () => {
    // 文字を指定すると
    const action = selectChar({
      questionId: '1',
      charIndex: 0
    })
    const result = reducer(undefined, action)
    // 選択中の文字に追加される
    expect(result.selectedChar).toEqual({
      questionId: '1',
      charIndex: 0
    })
  })
  it('deselectChar: 文字選択を解除', () => {
    // deselectCharが発行されると
    const action = deselectChar()
    const result = reducer({
      ...initialState,
      selectedChar: {
        questionId: '1',
        charIndex: 0
      }
    }, action)
    // 選択中の文字が解除される
    expect(result.selectedChar).toEqual(null)
  })
  it('swapChars: 文字を入れ替え', () => {
    // 入れ替える文字を指定してactionを発行すると
    const action = swapChars([{
      questionId: '1',
      charIndex: 0
    }, {
      questionId: '1',
      charIndex: 1
    }])
    const result = reducer({
      ...initialState,
      questions: [{
        id: '1',
        name: 'ギフシダネ',
        currentName: 'ギフシダネ',
      }]
    }, action)
    // 文字が入れ替わる
    expect(result.questions[0]).toEqual({
      id: '1',
      name: 'ギフシダネ',
      currentName: 'フギシダネ',
    })
  })
  it('swapChars: 3個以上の入れ替えは無効', () => {
    const action = swapChars([{
      questionId: '1',
      charIndex: 0
    }, {
      questionId: '1',
      charIndex: 1
    }, {
      questionId: '1',
      charIndex: 2
    }])
    const result = reducer({
      ...initialState,
      questions: [{
        id: '1',
        name: 'ギフシダネ',
        currentName: 'ギフシダネ',
      }, {
        id: '20',
        name: 'クチート',
        currentName: 'トーチク',
      }]
    }, action)
    expect(result.questions).toEqual([{
      id: '1',
      name: 'ギフシダネ',
      currentName: 'ギフシダネ',
    }, {
      id: '20',
      name: 'クチート',
      currentName: 'トーチク',
    }])
  })
  it('swapChars: 同じindexの入れ替えは無効', () => {
    const action = swapChars([{
      questionId: '1',
      charIndex: 0
    }, {
      questionId: '1',
      charIndex: 0
    }])
    const result = reducer({
      ...initialState,
      questions: [{
        id: '1',
        name: 'ギフシダネ',
        currentName: 'ギフシダネ',
      }]
    }, action)
    expect(result.questions).toEqual([{
      id: '1',
      name: 'ギフシダネ',
      currentName: 'ギフシダネ',
    }])
  })
  it('swapChars: 問題またぎの入れ替えは無効', () => {
    const action = swapChars([{
      questionId: '1',
      charIndex: 0
    }, {
      questionId: '20',
      charIndex: 1
    }])
    const result = reducer({
      ...initialState,
      questions: [{
        id: '1',
        name: 'ギフシダネ',
        currentName: 'ギフシダネ',
      }]
    }, action)
    expect(result.questions).toEqual([{
      id: '1',
      name: 'ギフシダネ',
      currentName: 'ギフシダネ',
    }])
  })
  it('checkAnswers: 正誤判定', () => {
    // 正解の判定をすると
    const action = checkAnswers();
    const result = reducer({
      ...initialState,
      answers: {
        '1': {
          id: '1',
          name: 'フシギダネ'
        },
        '20': {
          id: '20',
          name: 'クチート'
        }
      },
      questions: [{
        id: '1',
        name: 'ギフシダネ',
        currentName: 'フシギダネ',
      }, {
        id: '20',
        name: 'トーチク',
        currentName: 'トーチク',
      }],
    }, action)
    // 正解した問題の配列にidが追加される
    expect(result.correctQuestions.includes('1')).toBe(true)
    expect(result.correctQuestions.includes('20')).toBe(false)
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
      questions: [],
      selectedChar: null,
      currentQIndex: 0,
      existedQLength: 0,
      isAllCorrect: false
    });
  })
})