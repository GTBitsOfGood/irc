import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import RootStore from './models/RootStore';
import TodoListModel from './models/TodoListModel';
import TodoModel from "./models/TodoModel";

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
