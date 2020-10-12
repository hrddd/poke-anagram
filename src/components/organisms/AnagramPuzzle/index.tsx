import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAnagramPuzzle } from "../../../redux/modules/anagramPuzzle";
import { AnagramPuzzleEnd } from "../AnagramPuzzleEnd";
import { AnagramPuzzleStart } from "../AnagramPuzzleStart";
import { AnagramPuzzleMain } from "../AnagramPuzzleMain";
import { usePokeDex } from "../../hooks/usePokeDex";

export const AnagramPuzzlePage = () => {
  const { isAllCorrect, needsInitialize } = useSelector(selectAnagramPuzzle);
  const [, fetchData] = usePokeDex();

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      {isAllCorrect
        && (<AnagramPuzzleEnd />)
        || needsInitialize && (
          <AnagramPuzzleStart />
        )
        || !needsInitialize && (
          <AnagramPuzzleMain />)}
    </div>
  )
};