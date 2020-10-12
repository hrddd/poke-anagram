import * as React from "react";
import { LoadingModal } from "./components/organisms/LoadingModal";
import { AnagramPuzzlePage } from "./components/organisms/AnagramPuzzle";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AnagramPuzzlePage />
        <LoadingModal />
      </div>
    );
  }
}

export default App;
