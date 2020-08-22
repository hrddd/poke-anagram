import * as React from "react";
import { SelectedAnagramPuzzle } from '../../../redux/modules/anagramPuzzle';

type Props = {
  anagramPuzzle: SelectedAnagramPuzzle
};

const Questions = (props: { data: SelectedAnagramPuzzle['data'] }) => {
  const { data } = props;
  return (<ul>
    {data.map((pokemon) => (
      <li key={pokemon.name}>{pokemon.name}</li>
    ))}
  </ul>)
};

const Component: React.SFC<Props> = (props) => {
  const { data, currentStep, maxStep } = props.anagramPuzzle;
  return (
    <>
      <div>{currentStep}/{maxStep}</div>
      {data.length > 0 && (<Questions data={data} />)}
    </>
  );
};

export const AnagramPuzzleComponent = React.memo(Component);