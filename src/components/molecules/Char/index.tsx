import { Item, useSwapableItem } from "../../hooks/useSwapableItem";

import React from "react";

export type HandleDrop = ([before, after]: [Item, Item]) => void
export type HandleClick = (e: React.MouseEvent<HTMLButtonElement>) => void
type CharProps = {
  char: string,
  isSelected: boolean,
  name: string,
  value: number,
  handleClick: HandleClick,
  handleDrop: HandleDrop
}
export const Char = (props: CharProps) => {
  const { isSelected, char, handleClick, name, value, handleDrop } = props;
  const [{
    isDragging,
  }, ref] = useSwapableItem({
    type: 'Char',
    id: name,
    index: value,
    handleDrop
  });
  return (<button
    ref={ref}
    style={{
      border: '1px solid',
      borderRadius: '3px',
      height: '60px',
      width: '60px',
      background: isSelected ? 'lightGreen' : 'white',
      fontSize: '20px',
      opacity: isDragging ? 0.5 : 1
    }}
    name={name}
    value={value}
    onClick={handleClick}
  >{char}</button>
  );
};