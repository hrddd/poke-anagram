import * as React from "react";
import HogeContainer from "./components/organisms/Hoge";
import { AnagramPuzzle } from "./components/organisms/AnagramPuzzle";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HogeContainer />
        <AnagramPuzzle />
      </div>
    );
  }
}

export default App;
