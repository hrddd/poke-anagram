import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AnagramPuzzleStartPage } from "./components/pages/AnagramPuzzleStart";
import { AnagramPuzzleEndPage } from "./components/pages/AnagramPuzzleEnd";
import { AnagramPuzzleMainPage } from "./components/pages/AnagramPuzzleMain";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/start">
            <AnagramPuzzleStartPage />
          </Route>
          <Route exact path="/">
            <AnagramPuzzleMainPage />
          </Route>
          <Route path="/end">
            <AnagramPuzzleEndPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
