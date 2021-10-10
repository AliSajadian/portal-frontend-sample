import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import {BrowserRouter} from "react-router-dom"
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
// import Favicon from 'react-favicon';
import App from "./App";
import store from "../src/redux/store/index";

ReactDOM.render(<Provider store={store} ><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById("root"));
