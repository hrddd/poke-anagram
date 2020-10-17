import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AnagramPuzzleStartPage } from "./components/pages/AnagramPuzzleStart";
import { AnagramPuzzleEndPage } from "./components/pages/AnagramPuzzleEnd";
import { AnagramPuzzleMainPage } from "./components/pages/AnagramPuzzleMain";
import { useSelector } from "react-redux";
import { selectAnagramPuzzle } from './redux/modules/anagramPuzzle';

export const START_PATH = "/";
export const PLAY_PATH = "/play";
export const END_PATH = "/end";

const App: React.SFC = () => {
  const { hasQuestions } = useSelector(selectAnagramPuzzle)

  return (
    <Router>
      <Switch>
        <Route exact path={START_PATH}>
          <AnagramPuzzleStartPage />
        </Route>
        <HasQuestionsRoute hasQuestions={hasQuestions} path={PLAY_PATH}>
          <AnagramPuzzleMainPage />
        </HasQuestionsRoute>
        <HasQuestionsRoute hasQuestions={hasQuestions} path={END_PATH}>
          <AnagramPuzzleEndPage />
        </HasQuestionsRoute>
      </Switch>
    </Router>
  );
}

type PlayingRouteProps = {
  children: React.ReactNode,
  hasQuestions: boolean,
  path: string
}

const HasQuestionsRoute: React.SFC<PlayingRouteProps> = ({ children, hasQuestions, ...rest }) => {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasQuestions ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: START_PATH,
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default App;
