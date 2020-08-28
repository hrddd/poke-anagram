import * as React from "react";
import { SelectedAnagramPuzzle, SelectCharPayload } from '../../../redux/modules/anagramPuzzle';

type Props = {
  anagramPuzzle: SelectedAnagramPuzzle,
  handleOnClickFactory: (payload: SelectCharPayload) => (e: React.MouseEvent<HTMLButtonElement>) => void
};

const Char = (props: { char: string, isSelected: boolean, handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const { isSelected, char, handleOnClick } = props;
  return (<button
    style={{ border: '1px solid', height: '40px', width: '40px', background: isSelected ? 'red' : 'gray' }}
    onClick={handleOnClick}>{char}</button>
  );
};

const Questions = (props: { data: SelectedAnagramPuzzle['questionData'], handleOnClickFactory: (payload: SelectCharPayload) => (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const { data, handleOnClickFactory } = props;
  return (<ul>
    {data.map((question) => (
      <li key={question.id}>
        {question.name.map(({ id, char, isSelected }) => {
          // TODO: handleOnClickが異なる関数と解釈されるため、無駄な再描画がありそう？確認する
          // TODO: questionId, charIdは段階に応じて一個づつ渡した方が・・・？状況に合わす
          // TODO: ただやっぱりコレmoleculesでやる動作ではない気がするんだよなあ、、、パーツ、organismsのパーツってことで、、、でもいいのかな
          return (<Char key={id} char={char} isSelected={isSelected} handleOnClick={handleOnClickFactory({
            charId: id,
            questionId: question.id
          })} />);
        })}
      </li>
    ))}
  </ul>)
};

const Component: React.SFC<Props> = (props) => {
  const { anagramPuzzle: { questionData, currentStep, maxStep }, handleOnClickFactory } = props;
  return (
    <>
      <div>{currentStep}/{maxStep}</div>
      {questionData.length > 0 && (<Questions
        data={questionData} handleOnClickFactory={handleOnClickFactory}
      />)}
    </>
  );
};

export const AnagramPuzzleComponent = React.memo(Component);