import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createIndexedDB } from './utils/IndexedDb';
import 'bootstrap/dist/css/bootstrap.css';

createIndexedDB()
    .then((resp) => {
        ReactDOM.render(
            <App />,
            document.getElementById('root')
        );
    })
    .catch((err) => {
        console.log("Error creating/accessing IndexedDB database");
        alert("Please use latest version of chrome/firefox");
    })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
