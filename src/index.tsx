import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

ReactDOM.render(
  (<>
    <Provider store={store}>
      <App />
    </Provider>
    <div id="modal"></div>
  </>),
  document.getElementById("root") as HTMLElement
);

// registerServiceWorker();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
