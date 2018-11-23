import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import RootStore from './models/RootStore';

import App from './App';

import '../assets/bootstrap/css/bootstrap.min.css';

const store = new RootStore();

render(
  <div>
    <DevTools />
    <App store={store} />
  </div>,
  document.getElementById("root")
);

// playing around in the console
window.store = store;
