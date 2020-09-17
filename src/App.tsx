import * as React from "react";
import { AnagramPuzzle } from "./components/organisms/AnagramPuzzle";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AnagramPuzzle />
      </div>
    );
  }
}

export default App;
