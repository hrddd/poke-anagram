import * as React from "react";
import { SelectedAnagramPazzle } from '../../../redux/modules/anagramPazzle';

type Props = {
  anagramPazzle: SelectedAnagramPazzle
};

const Questions = (props: { data: SelectedAnagramPazzle['data'] }) => {
  const { data } = props;
  return (<ul>
    {data.map((pokemon) => (
      <li key={pokemon.name}>{pokemon.name}</li>
    ))}
  </ul>)
};

const Component: React.SFC<Props> = (props) => {
  const { data, currentStep, maxStep } = props.anagramPazzle;
  return (
    <>
      <div>{currentStep}/{maxStep}</div>
      {data.length > 0 && (<Questions data={data} />)}
    </>
  );
};

export const AnagramPazzleComponent = React.memo(Component);