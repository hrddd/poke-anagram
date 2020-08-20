import * as React from "react";
import HogeContainer from "./components/organisms/Hoge";
import { AnagramPazzle } from "./components/organisms/AnagramPazzle";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HogeContainer />
        <AnagramPazzle />
      </div>
    );
  }
}

export default App;
