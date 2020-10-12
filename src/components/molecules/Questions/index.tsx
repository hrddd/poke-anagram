import { Char, HandleDrop, HandleClick } from "../Char";
import React from "react";

type QuestionsProps = {
  questions: { id: string, chars: { char: string, isSelected: boolean }[], isCorrect: boolean }[],
  handleClick: HandleClick,
  handleDrop: HandleDrop
}
export const Questions = (props: QuestionsProps) => {
  const { questions, handleClick, handleDrop } = props;
  return (<ul style={{
    padding: 0,
  }}>
    {questions.map((question) => (
      <li
        key={`Questions${question.id}`}
        style={{
          listStyle: 'none',
          marginTop: '16px',
          background: question.isCorrect ? 'blue' : 'white'
        }}
      >
        {question.chars.map((char, index) => (<Char
          key={`Questions${question.id}${index}`}
          value={index}
          char={char.char}
          name={question.id}
          isSelected={char.isSelected}
          handleClick={handleClick}
          handleDrop={handleDrop}
        />))}
        {question.isCorrect && (<div style={{ color: "white" }}>
          正解！
        </div>)}
      </li>
    ))}
  </ul>)
};