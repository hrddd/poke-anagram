import { anagramPuzzle, setAnagramPuzzleBaseData } from '../anagramPuzzle';


describe('anagramPuzzle reducer', () => {
  it('初期State', () => {
    const result = anagramPuzzle(undefined, { type: 'hoge' });
    expect(result).toEqual({
      baseData: [],
      questionData: [],
      isLoading: false,
      isComplete: false,
      currentIndex: 0,
    })
  })
  // TODO: testがすごいめんどい。考える、、、
  // it('Action:setData: データのセット', () => {
  //   const action = setAnagramPuzzleBaseData({
  //     data: [{
  //       id: 1,
  //       name: 'フシギダネ'
  //     }],
  //     step: 0
  //   });
  //   const result = anagramPuzzle(undefined, action);
  //   expect(result).toEqual({
  //     baseData: [{
  //       id: 001,
  //       name: 'フシギダネ'
  //     }],
  //     questionData: [],
  //     isLoading: false,
  //     isComplete: false,
  //     currentIndex: 0,
  //   })
  // })
})