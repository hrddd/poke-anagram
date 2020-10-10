import * as React from "react";
import { AnagramPuzzle } from "./components/organisms/AnagramPuzzle";
import { LoadingModal } from "./components/organisms/LoadingModal";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AnagramPuzzle />
        <LoadingModal />
      </div>
    );
  }
}

export default App;
