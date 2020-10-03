import { reducer, createQuestion, selectChar, deselectChar, swapChars, checkAnswers, selectAnagramPuzzle, startTimeAttack, finishTimeAttack, getResultTime } from '../anagramPuzzle';
import { configureStore } from './configureMockStore';

const initialState = {
  answers: {},
  questions: [],
  selectedChar: null,
  correctQuestions: [],
  startDate: null,
  endDate: null
};

describe('anagramPuzzle reducer', () => {
  describe('初期State', () => {
    it('初期Stateを構築できる', () => {
      const result = reducer(undefined, { type: 'hoge' });
      expect(result).toEqual(initialState)
    })
  })
  describe('createQuestion: 問題を作成', () => {
    it('ベースのデータから、問題と答えを生成できる', () => {
      const baseData = [{
        id: '1',
        name: 'フシギダネ'
      }, {
        id: '20',
        name: 'クチート'
      }];
      const action = createQuestion(baseData);
      const result = reducer(undefined, action);
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
  })
  describe('selectChar: 文字を選択', () => {
    it('選択した文字の位置と、所属する問題を記憶できる', () => {
      const action = selectChar({
        questionId: '1',
        charIndex: 0
      })
      const result = reducer(undefined, action)
      expect(result.selectedChar).toEqual({
        questionId: '1',
        charIndex: 0
      })
    })
  })
  describe('deselectChar: 文字選択を解除', () => {
    it('選択中の文字情報をリセットできる', () => {
      const action = deselectChar()
      const result = reducer({
        ...initialState,
        selectedChar: {
          questionId: '1',
          charIndex: 0
        }
      }, action)
      expect(result.selectedChar).toEqual(null)
    })
  })
  describe('swapChars: 文字の入れ替え', () => {
    it('2文字を指定すると位置が入れ替わる', () => {
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
      expect(result.questions[0]).toEqual({
        id: '1',
        name: 'ギフシダネ',
        currentName: 'フギシダネ',
      })
    })
    it('3文字以上指定すると入れ替えは起らない', () => {
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
    it('同じ文字を指定すると入れ替えは起らない', () => {
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
    it('問題をまたぐと入れ替えは起らない', () => {
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
  })
  describe('checkAnswers: 正誤判定', () => {
    let correctQuestions: string[]
    beforeEach(() => {
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
      correctQuestions = result.correctQuestions
    })
    it('正解した問題のidが、正解済みの配列に追加される', () => {
      expect(correctQuestions.includes('1')).toBe(true)
    })
    it('不正解のものは、追加されない', () => {
      expect(correctQuestions.includes('20')).toBe(false)
    })
  })
  describe('startTimeAttack: タイム計測スタート', () => {
    it('開始した日時を記憶する', () => {
      let startDate = new Date();
      const action = startTimeAttack(startDate)
      const result = reducer(undefined, action)
      expect(result.startDate).toEqual(startDate)
    })
  })
  describe('finishTimeAttack: タイム計測終了', () => {
    it('終了した日時を記憶する', () => {
      let endDate = new Date();
      const action = finishTimeAttack(endDate)
      const result = reducer(undefined, action)
      expect(result.endDate).toEqual(endDate)
    })
  })
})
describe('anagramPuzzle selector', () => {
  describe('Props', () => {
    it('StateからAnagramPazzle画面用のPropsを取得できる', () => {
      const store = configureStore();
      const result = selectAnagramPuzzle(store.getState());
      expect(result).toEqual({
        questions: [],
        selectedChar: null,
        currentQIndex: 0,
        existedQLength: 0,
        isAllCorrect: false,
        resultTime: null
      });
    })
  })
  describe('getResultTime: タイムアタック結果の取得', () => {
    const startDate = new Date('1995-12-17T03:24:00')
    const endDate = new Date('1995-12-17T03:24:30')
    const wrongEndDate = new Date('1995-12-17T03:23:00')
    it('開始時刻と終了時刻から、かかった時間(ms)が算出できる', () => {
      const resultTime = getResultTime(startDate, endDate)
      expect(resultTime).toEqual(30000);
    })
    it('開始時刻より終了時刻が早ければ、エラーとなる', (done) => {
      try {
        getResultTime(startDate, wrongEndDate);
      } catch {
        done();
      }
    })
    it('どちらかがnullならnullを返す', () => {
      const resultTime = getResultTime(null, endDate)
      expect(resultTime).toEqual(null);
    })
  })
})