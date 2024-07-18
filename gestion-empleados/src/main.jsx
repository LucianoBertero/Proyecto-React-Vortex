import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { EmployeesApp } from "./EmployeesApp";
import { Provider } from "react-redux";

import { store } from "./store/store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <EmployeesApp></EmployeesApp>
      </BrowserRouter>
    </Provider>
  </>
);
