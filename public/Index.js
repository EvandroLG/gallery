import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from "./components/App";

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;
const store = createStore(
    rootReducer,
    reduxDevtools && reduxDevtools()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
